import { requestWithRefresh } from '@/utils/request-with-refresh';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrderState } from '@/types';

type TOrderResponse = {
  success: boolean;
  name: string;
  order: { number: number };
  message?: string;
};

export const fetchOrder = createAsyncThunk<TOrderResponse, string[]>(
  'order/fetchOrder',
  async (ingredientsId: string[]) => {
    return requestWithRefresh<TOrderResponse>('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ ingredients: ingredientsId }),
    });
  }
);

const initialState: TOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderSuccess: false,
  orderError: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.orderRequest = false;
      state.orderError = null;
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
          state.orderNumber = action.payload.order.number;
          state.orderRequest = false;
          state.orderError = null;
          state.orderSuccess = true;
        } else {
          state.orderRequest = false;
          state.orderError = action.payload.message || 'Неизвестная ошибка';
          state.orderSuccess = false;
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message ?? 'Неизвестная ошибка';
        state.orderSuccess = false;
      });
  },
});

export default orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
