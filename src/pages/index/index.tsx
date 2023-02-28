/**
 * @author lihao7364@gmail.com
 * @date 2023-01-10 23:48:40
 * @desc
 */
import React, { useCallback, useState, useEffect } from 'react';
// import { incrementAsync, increment } from '@/store/store';
import { Button } from 'antd';

/** 首页 */
const Index = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {}, []);

  const handleClickCounter = useCallback(() => {
    setCount(preCount => preCount + 1);
  }, []);

  return (
    <div className="index">
      <div>首页-{count}</div>
      <Button onClick={handleClickCounter}>计数器</Button>
    </div>
  );
};
export default Index;
