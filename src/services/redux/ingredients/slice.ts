import request from '@/utils/request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TIngredientsState, TItem } from '@/types';

type TIngredientsResponse = {
  data: TItem[];
};

export const fetchIngredients = createAsyncThunk<TIngredientsResponse>(
  'ingredients/fetchIngredients',
  async () => {
    return request('/ingredients') as Promise<TIngredientsResponse>;
  }
);
const initialState: TIngredientsState = {
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
