import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsThunk = createAsyncThunk('order/getFeeds', getFeedsApi);
export const getOrdersThunk = createAsyncThunk('order/getOrders', getOrdersApi);
export const getOrderByNumThunk = createAsyncThunk(
  'order/getOrderByNum',
  getOrderByNumberApi
);
export const postOrderThunk = createAsyncThunk(
  'order/postOrder',
  orderBurgerApi
);
