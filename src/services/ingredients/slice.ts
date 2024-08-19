import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { fetchIngredientsThunk } from './actions';

export interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined | null;
}

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { ingredientsSelector, isLoadingSelector } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
