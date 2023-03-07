/**
 * @author lihao7364@gmail.com
 * @date 2023-01-10 23:48:40
 * @desc
 */
import React, { useEffect } from 'react';
import Counter from '@/features/counter/counter';

/** 首页 */
const Index = () => {
  useEffect(() => {}, []);
  console.log('p1');
  setTimeout(() => {
    console.log('p5');
  }, 0);
  new Promise(() => {
    console.log('p2');
  }).then(() => console.log('p3'));
  console.log('p4');

  return (
    <div className="index">
      <Counter />
    </div>
  );
};
export default Index;
