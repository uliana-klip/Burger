import { createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TFeedState = {
  connected: boolean;
  error: string | null;
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  isLoaded?: boolean;
};

export type TFeedMessage = Omit<TFeedState, 'connected' | 'error'>;

const initialState: TFeedState = {
  connected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
  isLoaded: false,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsFeedConnect: () => {
      //состояние не меняется, обработка middleware
    },
    wsFeedDisconnect: () => {
      //состояние не меняется, обработка middleware
    },
    wsFeedOpen: (state) => {
      state.connected = true;
      state.error = null;
    },
    wsFeedClose: (state) => {
      state.connected = false;
      state.error = null;
    },
    wsFeedError: (state, action: PayloadAction<string>) => {
      state.connected = false;
      state.error = action.payload;
    },
    wsFeedMessage: (state, action: PayloadAction<TFeedMessage>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export default feedSlice.reducer;
export const {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
} = feedSlice.actions;
