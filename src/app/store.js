/* create and configure the Redux store for the app using the configureStore function provided by @reduxjs/toolkit 
and associate to it a single reducer (todoReducer) that handles the state related to our todos*/

import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});