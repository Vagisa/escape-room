import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

const selectAuthInfo = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authInfo;
const selectBookings = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].bookings;
const selectReservations = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].reservations;
const selectBookingPageLoading = (state: Pick<State, NameSpace.User>) =>
  state[NameSpace.User].isBookingPageLoading;
const selectMyQuestsPageLoading = (state: Pick<State, NameSpace.User>) =>
  state[NameSpace.User].isMyQuestsPageLoading;
const selectAuthorizationStatus = (state: Pick<State, NameSpace.User>) =>
  state[NameSpace.User].authorizationStatus;

export {
  selectAuthInfo,
  selectBookings,
  selectReservations,
  selectBookingPageLoading,
  selectMyQuestsPageLoading,
  selectAuthorizationStatus };
