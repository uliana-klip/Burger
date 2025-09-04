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
      //в следующем спринте сделать!
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
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
      //в следующем спринте сделать!
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
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
