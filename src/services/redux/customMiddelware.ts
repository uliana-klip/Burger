import type { Middleware } from '@reduxjs/toolkit';

const customMiddleware: Middleware = () => (next) => (action) => {
  console.log('hello from middleware', action);

  return next(action);
};
export default customMiddleware;
