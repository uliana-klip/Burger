import reducer, { setIngredient, clearIngredient } from './slice';

const initialState = {
  currentIngredient: null,
};

const ingredient = {
  _id: '01a',
  name: 'name',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'src',
  image_mobile: 'src',
  image_large: 'src',
  __v: 1,
};

describe('details slice', () => {
  it('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});

describe('setIngredient', () => {
  it('добавляет ингредиент для модалки', () => {
    const prev = initialState;

    const state = reducer(prev, setIngredient(ingredient));
    expect(state.currentIngredient).toEqual({
      _id: '01a',
      name: 'name',
      type: 'bun',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: 'src',
      image_mobile: 'src',
      image_large: 'src',
      __v: 1,
    });
  });
});

describe('clearIngredient', () => {
  it('удаляет ингредиент при закрытии модалки', () => {
    const prev = { currentIngredient: ingredient };
    const state = reducer(prev, clearIngredient());
    expect(state.currentIngredient).toBe(null);
  });
});
