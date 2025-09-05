import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { TBasketState } from '@/types';

const initialState: TBasketState = {
  selectedIngredients: [],
  selectedBun: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addIngredients: {
      reducer(state, action) {
        state.selectedIngredients.push(action.payload);
      },
      //@ts-expect-error - следующий спринт
      prepare: (ingredient) => {
        return {
          payload: { ...ingredient, uid: uuidv4() },
        };
      },
    },
    removeIngredients: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.uid !== action.payload
      );
    },
    addBun: {
      reducer(state, action) {
        state.selectedBun = action.payload;
      },
      //@ts-expect-error - следующий спринт
      prepare: (bun) => {
        return {
          payload: { ...bun, uid: uuidv4() },
        };
      },
    },
    clearBasket: (state) => {
      state.selectedIngredients = [];
      state.selectedBun = null;
    },
    setNewOrder: (state, action) => {
      state.selectedIngredients = action.payload;
    },
  },
});

export const { addIngredients, addBun, removeIngredients, clearBasket, setNewOrder } =
  basketSlice.actions;
export default basketSlice.reducer;
