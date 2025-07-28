import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    selectedIngredients: [],
    selectedBun: null,
  },
  reducers: {
    addIngredients: {
      reducer(state, action) {
        state.selectedIngredients.push(action.payload);
      },
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
