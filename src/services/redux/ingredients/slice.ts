import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import request from '../../../utils/request';

import type { TIngredientsState, TIngredientMain } from '../../../types';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredientMain[];
};

export const fetchIngredients = createAsyncThunk<TIngredientsResponse>(
  'ingredients/fetchIngredients',
  async () => {
    return request<TIngredientsResponse>('/ingredients');
  }
);
export const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFulfiled: false,
  ingredientsError: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.ingredientsRequest = false;
        state.ingredientsFulfiled = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsError = action.error.message ?? 'Произошла ошибка';
      });
  },
});

export default ingredientsSlice.reducer;
