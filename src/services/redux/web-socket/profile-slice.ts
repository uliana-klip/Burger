import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TFeedMessage, TFeedState } from './feed-slice';

type TProfileState = TFeedState;

const initialState: TProfileState = {
  connected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
  isLoaded: false,
};
type TProfileMessage = TFeedMessage;

const profileSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsProfileConnect: () => {
      //состояние не меняется, обработка middleware
    },
    wsProfileDisconnect: () => {
      //состояние не меняется, обработка middleware
    },
    wsProfileOpen: (state) => {
      state.connected = true;
      state.error = null;
      state.isLoaded = false;
    },
    wsProfileClose: (state) => {
      state.connected = false;
      state.error = null;
      state.isLoaded = false;
    },
    wsProfileError: (state, action: PayloadAction<string>) => {
      state.connected = false;
      state.error = action.payload;
      state.isLoaded = true;
    },
    wsProfileMessage: (state, action: PayloadAction<TProfileMessage>) => {
      state.orders = action.payload.orders;
      state.isLoaded = true;
    },
  },
});

export default profileSlice.reducer;
export const {
  wsProfileConnect,
  wsProfileDisconnect,
  wsProfileOpen,
  wsProfileClose,
  wsProfileError,
  wsProfileMessage,
} = profileSlice.actions;
