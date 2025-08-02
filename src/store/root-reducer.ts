import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { bookingReducer } from './booking/booking-reducer';
import { questReducer } from './quest/quest-reducer';
import { userReducer } from './user/user-reducer';

export const rootReducer = combineReducers({
  [NameSpace.Booking]: bookingReducer.reducer,
  [NameSpace.Quest]: questReducer.reducer,
  [NameSpace.User]: userReducer.reducer,
});
