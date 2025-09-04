import request from '@/utils/request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (ingredientsId: string[]) => {
    return request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsId }),
    });
  }
);

type TOrderState = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderError: string | null;
};

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
        //в следующем спринте сделать!
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (action.payload.success) {
          //в следующем спринте сделать!
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          state.orderNumber = action.payload.order.number;
          state.orderRequest = false;
          state.orderError = null;
        } else {
          state.orderRequest = false;
          //в следующем спринте сделать!
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          state.orderError = action.payload.message || 'Неизвестная ошибка';
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
        const error = action.payload as { message?: string };
        state.orderError = error?.message ?? 'Неизвестная ошибка';
      });
  },
});

export default orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
