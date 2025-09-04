import { configureStore } from '@reduxjs/toolkit';

import customMiddleware from './customMiddelware.js';
import rootReducer from './index.js';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export default store;
