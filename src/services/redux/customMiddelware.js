export default () => (next) => (action) => {
  console.log('hello from middleware', action);

  return next(action);
};
