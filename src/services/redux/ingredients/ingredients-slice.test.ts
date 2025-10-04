import reducer, { initialState, fetchIngredients } from './slice';

const ingredients = [
  {
    _id: '01a',
    name: 'name',
    type: 'bun' as const,
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: 'scr',
    image_mobile: 'scr',
    image_large: 'scr',
    __v: 1,
  },
  {
    _id: '02a',
    name: 'name2',
    type: 'sauce' as const,
    proteins: 2,
    fat: 2,
    carbohydrates: 2,
    calories: 2,
    price: 2,
    image: 'scr',
    image_mobile: 'scr',
    image_large: 'scr',
    __v: 2,
  },
  {
    _id: '03a',
    name: 'name3',
    type: 'main' as const,
    proteins: 3,
    fat: 3,
    carbohydrates: 3,
    calories: 3,
    price: 3,
    image: 'scr',
    image_mobile: 'scr',
    image_large: 'scr',
    __v: 3,
  },
];

const response = {
  success: true,
  data: ingredients,
};

describe('ingredients slice', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});

describe('fetchIngredients', () => {
  it('запрос ингредиентов', () => {
    const prev = initialState;
    const state = reducer(prev, fetchIngredients.pending(''));
    expect(state.ingredientsRequest).toBe(true);
    expect(state.ingredientsError).toBe(null);
    expect(state.ingredientsFulfiled).toBe(prev.ingredientsFulfiled);
    expect(state.ingredients).toBe(prev.ingredients);
  });
  it('загрузка ингредиентов', () => {
    const prev = initialState;
    const state = reducer(prev, fetchIngredients.fulfilled(response, ''));
    expect(state.ingredientsRequest).toBe(false);
    expect(state.ingredientsError).toBe(null);
    expect(state.ingredientsFulfiled).toBe(true);
    expect(state.ingredients).toEqual(ingredients);
  });
  it('ошибка при загрузке ингредиентов', () => {
    const prev = initialState;
    const state = reducer(prev, fetchIngredients.rejected(new Error('text'), ''));
    expect(state.ingredientsRequest).toBe(false);
    expect(state.ingredientsError).toBe('text');
  });
});
