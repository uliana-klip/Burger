export type TItem = {
  name: string;
  _id: string;
  image: string;
  price: number;
  type: string;
  uid?: string;
};

export type TRootState = {
  ingredients: TIngredientsState;
  basket: TBasketState;
  details: TDetailsState;
  order: TOrderState;
  user: TUserState;
};

export type TIngredientsState = {
  ingredients: TItem[];
  ingredientsRequest: boolean;
  ingredientsFulfiled: boolean;
  ingredientsError: string | null;
};

export type TBasketState = {
  selectedIngredients: TItem[];
  selectedBun: TItem | null;
};

export type TDetailsState = {
  currentIngredient: TItem | null;
};

export type TOrderState = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderError: string | null;
};

export type TUserData = {
  name: string;
  email: string;
};

export type TUserState = {
  user: TUserData | null;
  isAuthChecked: boolean;
  userRequest: boolean;
  userFailed: boolean;
};
