import request from '@/utils/request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    return request('/ingredients');
  }
);
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    ingredientsRequest: false,
    ingredientFulfiled: false,
    ingredientsError: null,
  },
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
        state.ingredientFulfiled = true;
        state.ingredientsError = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsError = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
