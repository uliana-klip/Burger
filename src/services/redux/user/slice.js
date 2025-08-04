import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { email: '', name: '' },
    isAuthChecked: false,
    userRequest: true,
    userFailed: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setAuthChecked } = userSlice.actions;
