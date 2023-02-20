/**
 * @author @myhexin.com
 * @date 2023-01-10 23:48:40
 * @desc
 */
import React, { useEffect } from 'react';
import {} from 'antd';

/** 首页 */
const Index = () => {
  useEffect(() => {}, []);
  // var name = 'windowsName';
  // (function a() {
  //   var name = 'Cherry';
  //   console.log(this);
  // })();
  debugger;
  console.log('outer:' + this);
  return <div className="index">首页</div>;
};
export default Index;
