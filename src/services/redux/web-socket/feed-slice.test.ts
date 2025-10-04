import reducer, {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
} from './feed-slice';

import type { TOrder } from '../../../types';

const initialState = {
  connected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
  isLoaded: false,
};

describe('feed slice', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      connected: false,
      error: null,
      orders: [],
      total: null,
      totalToday: null,
      isLoaded: false,
    });
  });
});

describe('wsFeedConnect', () => {
  it('не меняет состояние, экшен обрабатывается middleware', () => {
    const prev = initialState;
    const state = reducer(prev, wsFeedConnect());
    expect(state).toEqual(prev);
  });
});

describe('wsFeedDisconnect', () => {
  it('не меняет состояние, экшен обрабатывается middleware', () => {
    const prev = initialState;
    const state = reducer(prev, wsFeedDisconnect());
    expect(state).toEqual(prev);
  });
});

describe('wsFeedOpen', () => {
  it(' устанавливает соединение', () => {
    const prev = initialState;
    const state = reducer(prev, wsFeedOpen());
    expect(state).toEqual({
      connected: true,
      error: null,
      orders: [],
      total: null,
      totalToday: null,
      isLoaded: false,
    });
  });
  it('сбрасывает ошибку', () => {
    const prev = { ...initialState, error: 'error' };
    const state = reducer(prev, wsFeedOpen());
    expect(state.error).toBeNull();
    expect(state.connected).toBe(true);
  });
});

describe('wsFeedClose', () => {
  it('закрывает соединение', () => {
    const prev = initialState;
    const state = reducer(prev, wsFeedClose());
    expect(state).toEqual({
      connected: false,
      error: null,
      orders: [],
      total: null,
      totalToday: null,
      isLoaded: false,
    });
  });
  it('закрывает соединение и сбрасывает ошибку', () => {
    const prev = { ...initialState, connected: true, error: 'error' };
    const state = reducer(prev, wsFeedClose());
    expect(state.error).toBeNull();
    expect(state.connected).toBe(false);
  });
});

describe('wsFeedError', () => {
  it('закрывает соединение при ошибке', () => {
    const prev = { ...initialState, connected: true };
    const state = reducer(prev, wsFeedError('error'));
    expect(state.error).toBe('error');
    expect(state.connected).toBe(false);
  });
});

describe('wsFeedMessage', () => {
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
    const total = 123;
    const totalToday = 1;
    const state = reducer(prev, wsFeedMessage({ orders, total, totalToday }));
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(total);
    expect(state.totalToday).toBe(totalToday);
    expect(state.connected).toBe(prev.connected);
    expect(state.error).toBe(prev.error);
    expect(state.isLoaded).toBe(prev.isLoaded);
  });
});
