import { createSlice } from '@reduxjs/toolkit';

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    currentIngredient: null,
  },
  reducers: {
    setIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { setIngredient, clearIngredient } = detailsSlice.actions;
export default detailsSlice.reducer;
