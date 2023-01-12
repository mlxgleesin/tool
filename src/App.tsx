/**
 * @author lihao7364@gmail.com
 * @date 2023-01-09 23:29:47
 * @desc
 */
import React, { useEffect, useState, FC, useCallback } from 'react';
import { createStore } from 'redux';
import { Button } from 'antd';
import Index from './pages/index';

const defaultState = 0;
const reducer = (state = defaultState, action) => {
  console.log('action', action);

  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};
const store = createStore(reducer);
/** App */
const App = () => {
  const [name, setName] = useState(1);
  /** 发送action */
  const handleDispatchAction = useCallback(() => {
    store.dispatch({
      type: 'ADD',
      payload: 1,
    });
    console.log(store.getState());
  }, []);
  return (
    <div className="fs-10">
      <Button type="primary" onClick={handleDispatchAction}>
        点击
      </Button>
      <Index />
    </div>
  );
};
export default App;
