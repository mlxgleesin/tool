/**
 * @author lihao7364@gmail.com
 * @date 2023-01-10 23:48:40
 * @desc
 */
import React, { useCallback, useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Counter from '@/features/counter/counter';

/** 首页 */
const Index = () => {
  const count = useSelector(state => state.counter.value);
  useEffect(() => {}, []);

  const handleClickCounter = useCallback(() => {
    setCount(preCount => preCount + 1);
  }, []);

  return (
    <div className="index">
      <div>首页-{count}</div>
      <Button onClick={handleClickCounter}>计数器</Button>
      <Counter />
    </div>
  );
};
export default Index;
