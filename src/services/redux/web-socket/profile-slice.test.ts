import reducer, {
  wsProfileConnect,
  wsProfileDisconnect,
  wsProfileOpen,
  wsProfileClose,
  wsProfileError,
  wsProfileMessage,
} from './profile-slice';

import type { TOrder } from '../../../types';

const initialState = {
  connected: false,
  error: null,
  orders: [],
  isLoaded: false,
};

describe('profile slice', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      connected: false,
      error: null,
      orders: [],
      isLoaded: false,
    });
  });
});

describe('wsProfileConnect', () => {
  it('не меняет состояние, экшен обрабатывается middleware', () => {
    const prev = initialState;
    const state = reducer(prev, wsProfileConnect());
    expect(state).toEqual(prev);
  });
});

describe('wsProfileDisconnect', () => {
  it('не меняет состояние, экшен обрабатывается middleware', () => {
    const prev = initialState;
    const state = reducer(prev, wsProfileDisconnect());
    expect(state).toEqual(prev);
  });
});

describe('wsProfileOpen', () => {
  it(' устанавливает соединение', () => {
    const prev = initialState;
    const state = reducer(prev, wsProfileOpen());
    expect(state).toEqual({
      connected: true,
      error: null,
      orders: [],
      isLoaded: false,
    });
  });
  it('сбрасывает ошибку', () => {
    const prev = { ...initialState, error: 'error' };
    const state = reducer(prev, wsProfileOpen());
    expect(state.error).toBeNull();
    expect(state.connected).toBe(true);
  });
});

describe('wsProfileClose', () => {
  it('закрывает соединение', () => {
    const prev = initialState;
    const state = reducer(prev, wsProfileClose());
    expect(state).toEqual({
      connected: false,
      error: null,
      orders: [],
      isLoaded: false,
    });
  });
  it('закрывает соединение и сбрасывает ошибку', () => {
    const prev = { ...initialState, connected: true, error: 'error' };
    const state = reducer(prev, wsProfileClose());
    expect(state.error).toBeNull();
    expect(state.connected).toBe(false);
  });
});

describe('wsProfileError', () => {
  it('закрывает соединение при ошибке', () => {
    const prev = { ...initialState, connected: true };
    const state = reducer(prev, wsProfileError('error'));
    expect(state.error).toBe('error');
    expect(state.connected).toBe(false);
  });
});

describe('wsProfileMessage', () => {
  it('получает заказы', () => {
    const prev = initialState;
    const orders: TOrder[] = [
      {
        _id: '01a',
        number: 1,
        name: 'name',
        status: 'done',
        ingredients: [],
        createdAt: '00-00-ggfhf',
        updatedAt: '00-00-ggfhf',
      },
      {
        _id: '02a',
        number: 1,
        name: 'name',
        status: 'done',
        ingredients: [],
        createdAt: '00-00-ggfhf',
        updatedAt: '00-00-ggfhf',
      },
    ];
    const state = reducer(prev, wsProfileMessage({ orders }));
    expect(state.orders).toEqual(orders);
    expect(state.connected).toBe(prev.connected);
    expect(state.error).toBe(prev.error);
    expect(state.isLoaded).toBe(true);
  });
});
