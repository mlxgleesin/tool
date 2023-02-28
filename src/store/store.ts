import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/counterSlice';

console.log(counterReducer);

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
