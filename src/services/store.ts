import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';
import { constructorSlice } from './constructor/slice';
import { authSlice } from './authentication/slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineSlices(
  ingredientsSlice,
  orderSlice,
  constructorSlice,
  authSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
