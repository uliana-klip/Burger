import { combineReducers } from '@reduxjs/toolkit';

import basketReduсer from './basket/slice';
import detailsReducer from './details/slice';
import ingredientsReduсer from './ingredients/slice';
import orderReducer from './order/slice';
import userReducer from './user/slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReduсer,
  basket: basketReduсer,
  details: detailsReducer,
  order: orderReducer,
  user: userReducer,
});

export default rootReducer;
