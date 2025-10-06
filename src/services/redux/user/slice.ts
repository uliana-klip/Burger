import { createSlice } from '@reduxjs/toolkit';

import type { TUserState } from '../../../types';

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  userRequest: true,
  userFailed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setAuthChecked, logoutUser } = userSlice.actions;
