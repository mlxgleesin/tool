import React, { useEffect, useReducer } from 'react';
import { request } from 'umi';
import { RequestOptionsInit as RequestOptions } from 'umi-request';

const BEFORE_LOAD = 'BEFORE_LOAD';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAIL = 'LOAD_FAIL';
const UPDATE = 'UPDATE';

/** 初始化值函数 */
const initStateFn = (obj: any) => {
  return { res: obj || null, loading: false };
};
/** reducer */
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case BEFORE_LOAD:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case LOAD_FAIL:
      return { ...state, loading: false };
    case UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

type DispatchType = typeof BEFORE_LOAD | typeof LOAD_SUCCESS | typeof LOAD_FAIL | typeof UPDATE;
type DispatchPayload = { res: any; loading: boolean };
type Reducer = (
  state: DispatchPayload,
  action: { type: DispatchType; payload?: Partial<DispatchPayload> },
) => DispatchPayload;
/** dispatch更新值 */
type Dispatch = (obj: DispatchType, payload?: Partial<DispatchPayload>) => void;
/**
 * 支持统一的umi-request参数；
 * method为post时，params被当做data参数，当data和params同时存在时，params参数生效；
 */
export interface FetchParams extends RequestOptions {
  url: string;
  method?: 'get' | 'post' | 'GET' | 'POST';
  params?: object;
}
interface ReturnType<T> {
  /** 加载状态 */
  loading: boolean;
  /** 接口返回结果，如果有responseSuffix，则返回responseSuffix返回后的结果 */
  res: T;
  /** res的别名，和res一致 */
  data: T;
  /** 单独设置res的值 */
  setRes: (res: any) => void;
  /** 使用dispatch的方式更新值 */
  setResponse: Dispatch;
  /** 重新请求内容 */
  refresh: () => void;
}
/**
 * 后置处理函数，对接口返回值进行处理，并把处理结果存放在useState中
 * 避免过多计算，对只处理一次的接口有很好的优化效果
 */
type ResponseSuffix<T> = (obj: any) => Promise<T> | T;
/** 额外的配置选项 */
type Options<T> =
  | ResponseSuffix<T>
  | {
      /** 接口返回值的后置处理 */
      responseSuffix?: ResponseSuffix<T>;
      /** 修改useFetch中res的默认值 */
      defaultRes?: object;
      /** 请求成功或者失败都会执行的函数 */
      finallyFn?: (result: T, error: Error) => void;
    };
type fnReturnPromise = () => Promise<any>;
/** 支持传递配置参数，返回Promise的函数、和由返回Promise函数组成的数组；注意依赖设置 */
function useFetch<T = any>(
  /** fetch请求配置，若为false则不进行数据请求 */
  fetch: FetchParams | fnReturnPromise | fnReturnPromise[] | null | false | undefined,
  deps: any[],
  options: Options<T> = {},
): ReturnType<T> {
  const objOptions = typeof options === 'function' ? { responseSuffix: options } : options;
  const { responseSuffix, defaultRes, finallyFn } = objOptions;
  const [response, dispatch] = useReducer<Reducer>(reducer, initStateFn(defaultRes));
  let didCancel = false;
  // 数据获取方法
  const dataFetch = async () => {
    if (didCancel) return;
    let result;
    let error;
    try {
      // fetch有配置才进行下去
      if (fetch) {
        dispatch({ type: BEFORE_LOAD });
      }
      if (typeof fetch === 'function') {
        result = await fetch();
      } else if (Array.isArray(fetch)) {
        result = await Promise.all(fetch.map(fn => fn()));
      } else if (fetch) {
        const paramsObj = fetch;
        /**
         * 原本使用时，post没有区分data和params参数，现在采用新的方式
         * 兼容原有写法，post data不存在params存在时，params参数被当成data参数
         */
        if (
          paramsObj.method?.toLowerCase() === 'post' &&
          paramsObj.data === undefined &&
          paramsObj.params !== undefined
        ) {
          paramsObj.data = paramsObj.params;
          delete paramsObj.params;
        }
        const { url } = paramsObj;
        // delete paramsObj.url;
        result = await request(url, paramsObj);
      } else {
        return;
      }
      if (didCancel) return;
      if (responseSuffix && typeof responseSuffix === 'function') {
        result = await responseSuffix(result);
      }
      dispatch({ type: LOAD_SUCCESS, payload: { res: result } });
    } catch (e) {
      error = e;
      console.error(e);
      dispatch({ type: LOAD_FAIL });
    } finally {
      if (typeof finallyFn === 'function') {
        finallyFn(result, error);
      }
    }
  };
  useEffect(() => {
    dataFetch();
    return () => {
      didCancel = true;
    };
  }, deps);
  return {
    ...response,
    setResponse: dispatch,
    setRes: res => dispatch({ type: LOAD_SUCCESS, payload: { res } }),
    refresh: () => dataFetch(),
    data: response.res,
  };
}
export default useFetch;
