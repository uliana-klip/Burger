import { configureStore } from '@reduxjs/toolkit';

import customMiddleware from './customMiddelware';
import rootReducer from './index';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
  devTools: true,
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
