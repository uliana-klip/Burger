import reducer, { setUser, setAuthChecked, logoutUser, initialState } from './slice';

const user = {
  name: 'name',
  email: 'email@email.com',
};

describe('user slice', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});

describe('setUser', () => {
  it('добавляет пользователя при успешном логине', () => {
    const prev = initialState;
    const state = reducer(prev, setUser(user));
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.userFailed).toBe(prev.userFailed);
    expect(state.userRequest).toBe(prev.userRequest);
  });
});

describe('setAuthChecked', () => {
  it('если пользователь авторизирован ', () => {
    const prev = initialState;
    const state = reducer(prev, setAuthChecked());
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('logoutUser', () => {
  it('если пользователь разлогинился ', () => {
    const prev = { ...initialState, user: user };
    const state = reducer(prev, logoutUser());
    expect(state.user).toBe(null);
    expect(state.userFailed).toBe(prev.userFailed);
    expect(state.userRequest).toBe(prev.userRequest);
    expect(state.isAuthChecked).toBe(prev.isAuthChecked);
  });
});
