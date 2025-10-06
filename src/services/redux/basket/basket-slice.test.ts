import { vi } from 'vitest';

vi.mock('uuid', (): { v4: () => string } => ({
  v4: (): string => 'uid-1',
}));

import reducer, {
  initialState,
  addIngredients,
  addBun,
  removeIngredients,
  clearBasket,
  setNewOrder,
} from './slice';

const baseIngredient = {
  _id: '01a',
  name: 'name',
  type: 'main' as const,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'scr',
  image_mobile: 'scr',
  image_large: 'scr',
  __v: 1,
};

const bun = { ...baseIngredient, type: 'bun' as const };

const ingredientWithUID = { ...baseIngredient, uid: 'uid-1' };
const bunWithUID = { ...bun, uid: 'uid-1' };

const order = [
  { ...ingredientWithUID, uid: 'uid-1' },
  { ...ingredientWithUID, uid: 'uid-2' },
];

describe('basket slice', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});

describe('addIngredients', () => {
  it('добавляет ингредиент в корзину', () => {
    const prev = initialState;
    const state = reducer(prev, addIngredients(baseIngredient));
    expect(state.selectedIngredients).toEqual([ingredientWithUID]);
  });
});

describe('clearBasket', () => {
  it('очищение корзины', () => {
    const prev = { selectedIngredients: [ingredientWithUID], selectedBun: bunWithUID };
    const state = reducer(prev, clearBasket());
    expect(state.selectedIngredients).toEqual([]);
    expect(state.selectedBun).toBe(null);
  });
  it('удаление ингредиента из корзины', () => {
    const prev = {
      selectedIngredients: [
        {
          ...ingredientWithUID,
          uid: 'uid-1',
        },
        {
          ...ingredientWithUID,
          uid: 'uid-2',
        },
      ],
      selectedBun: bunWithUID,
    };
    const state = reducer(prev, removeIngredients('uid-2'));
    expect(state).toEqual({
      selectedIngredients: [
        {
          ...ingredientWithUID,
          uid: 'uid-1',
        },
      ],
      selectedBun: bunWithUID,
    });
  });
  describe('addBun', () => {
    it('первое добавление булки в корзину', () => {
      const prev = initialState;
      const state = reducer(prev, addBun(bun));
      expect(state.selectedBun).toEqual(bunWithUID);
    });
    it(' замена булки в корзине', () => {
      const prev = { ...initialState, selectedBun: bunWithUID };
      const state = reducer(prev, addBun(bun));
      expect(state.selectedBun).toEqual(bunWithUID);
    });
  });

  describe('setNewOrder', () => {
    it('заменяет список ингредиентов новым', () => {
      const prev = { ...initialState, selectedIngredients: [ingredientWithUID] };
      const state = reducer(prev, setNewOrder(order));
      expect(state.selectedIngredients).toEqual(order);
      expect(state.selectedBun).toBe(prev.selectedBun);
    });
  });
});
