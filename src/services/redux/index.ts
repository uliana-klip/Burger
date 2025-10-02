import { combineReducers } from '@reduxjs/toolkit';

import basketReduсer from './basket/slice';
import detailsReducer from './details/slice';
import ingredientsReduсer from './ingredients/slice';
import orderReducer from './order/slice';
import userReducer from './user/slice';
import feedReducer from './web-socket/feed-slice';
import profileOrderReducer from './web-socket/profile-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReduсer,
  basket: basketReduсer,
  details: detailsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrderReducer,
});

export default rootReducer;
