import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const res = await fetch(BASE_URL);
    return await res.json();
  }
);
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    ingredientsRequest: false,
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
        state.ingredientsError = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsError = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
