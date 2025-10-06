import { configureStore } from '@reduxjs/toolkit';

import customMiddleware from './customMiddelware';
import rootReducer from './index';
import { setUser } from './user/slice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
  devTools: true,
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

//для теста Cypress для проверки оформления заказа
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof window !== 'undefined' && (window as any).Cypress) {
  store.dispatch(setUser({ name: 'E2E', email: 'e2e@test.local' }));
}
