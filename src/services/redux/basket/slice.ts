import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { TBasketState, TItem } from '../../../types';

export const initialState: TBasketState = {
  selectedIngredients: [],
  selectedBun: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addIngredients: {
      reducer(state, action: PayloadAction<TItem>) {
        state.selectedIngredients.push(action.payload);
      },

      prepare: (ingredient) => {
        return {
          payload: { ...ingredient, uid: uuidv4() },
        };
      },
    },
    removeIngredients: (state, action: PayloadAction<string>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.uid !== action.payload
      );
    },
    addBun: {
      reducer(state, action: PayloadAction<TItem>) {
        state.selectedBun = action.payload;
      },

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
    setNewOrder: (state, action: PayloadAction<TItem[]>) => {
      state.selectedIngredients = action.payload;
    },
  },
});

export const { addIngredients, addBun, removeIngredients, clearBasket, setNewOrder } =
  basketSlice.actions;
export default basketSlice.reducer;
