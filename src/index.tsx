import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { Provider } from 'react-redux';
import store from '@/store/store';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
/**
 * @url https://github.com/GoogleChrome/web-vitals
 * @desc React脚手架自带性能检测工具
 */
// reportWebVitals(console.log);
