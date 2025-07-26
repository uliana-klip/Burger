import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (ingredientsId) => {
  const res = await fetch(ORDER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: ingredientsId }),
  });
  const data = await res.json();
  return data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    orderNumber: null,
    orderRequest: false,
    orderSuccess: false,
    orderError: false,
  },
  reducers: {
    clearOrder: (state) => {
      state.order = {};
      state.orderNumber = null;
      state.orderRequest = false;
      state.orderError = false;
      state.orderSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.order = action.payload;
          state.orderNumber = action.payload.order.number;
          state.orderRequest = false;
          state.orderError = false;
        } else {
          state.orderRequest = false;
          state.orderError = action.payload.message || 'Неизвестная ошибка';
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message;
      });
  },
});

export default orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
