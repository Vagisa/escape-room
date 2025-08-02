import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

const selectAuthInfo = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authInfo;
const selectReservations = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].reservations;
const selectAuthorizationStatus = (state: Pick<State, NameSpace.User>) =>
  state[NameSpace.User].authorizationStatus;

export { selectAuthInfo, selectReservations, selectAuthorizationStatus };
