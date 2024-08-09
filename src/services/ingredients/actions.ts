import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);
