import reducer, { initialState, clearOrder, fetchOrder } from './slice';

const ingredients = ['01a', '02a'];

const response = {
  success: true,
  name: 'name',
  order: { number: 1 },
  message: 'text',
};

const errorResponse = {
  ...response,
  success: false,
  order: { number: 0 },
};

describe('order slice', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});

describe('clearOrder', () => {
  it('удаление заказа после оформления', () => {
    const prev = {
      orderNumber: 123,
      orderRequest: true,
      orderSuccess: false,
      orderError: null,
    };
    const state = reducer(prev, clearOrder());
    expect(state.orderError).toBe(null);
    expect(state.orderNumber).toBe(null);
    expect(state.orderRequest).toBe(false);
    expect(state.orderSuccess).toBe(false);
  });
});

describe('fetchOrder', () => {
  it('оформление заказа', () => {
    const prev = initialState;
    const state = reducer(prev, fetchOrder.pending('', []));
    expect(state.orderError).toBe(null);
    expect(state.orderRequest).toBe(true);
  });
  it('получение номера заказа', () => {
    const prev = initialState;
    const state = reducer(prev, fetchOrder.fulfilled(response, '', ingredients));
    expect(state.orderNumber).toBe(1);
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(null);
    expect(state.orderSuccess).toBe(true);
  });
  it('битый ответ при оформлении заказа', () => {
    const prev = initialState;
    const state = reducer(prev, fetchOrder.fulfilled(errorResponse, '', ingredients));
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe('text');
    expect(state.orderSuccess).toBe(false);
    expect(state.orderNumber).toBe(null);
  });
  it('ошибка при оформлении заказа', () => {
    const prev = initialState;
    const state = reducer(prev, fetchOrder.rejected(new Error('text'), '', ingredients));
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe('text');
    expect(state.orderSuccess).toBe(false);
    expect(state.orderNumber).toBe(null);
  });
});
