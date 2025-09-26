export type TIngredientMain = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorItem = TIngredientMain & { uid?: string };

export type TItem = TIngredientMain & { uid: string };

export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TRootState = {
  ingredients: TIngredientsState;
  basket: TBasketState;
  details: TDetailsState;
  order: TOrderState;
  user: TUserState;
};

export type TIngredientsState = {
  ingredients: TIngredientMain[];
  ingredientsRequest: boolean;
  ingredientsFulfiled: boolean;
  ingredientsError: string | null;
};

export type TBasketState = {
  selectedIngredients: TItem[];
  selectedBun: TItem | null;
};

export type TDetailsState = {
  currentIngredient: TIngredientMain | null;
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

export type TOrderStatus = 'created' | 'pending' | 'done';

export type TOrder = {
  _id: string;
  number: number;
  name?: string;
  status?: TOrderStatus;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
};

export type TGalleryItem = { image: string; name: string };

export type TOrderCardProps = TOrder & {
  showStatus?: boolean;
};

export type TOrderFeedResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrderByNumberResponse = {
  success: boolean;
  orders: TOrder[];
};
