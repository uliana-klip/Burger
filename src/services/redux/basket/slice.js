import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    selectedIngredients: [],
    selectedBun: null,
  },
  reducers: {
    addIngredients: (state, action) => {
      state.selectedIngredients.push({ ...action.payload, uid: uuidv4() });
    },
    removeIngredients: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.uid !== action.payload
      );
    },
    addBun: (state, action) => {
      state.selectedBun = { ...action.payload, uid: uuidv4() };
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
