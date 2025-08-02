import { AuthorizationStatus } from '../utils/const';
import { FullBookingType } from './booking';

export type AuthInfoType = {
  email: string;
  token: string;
};

export type AuthDataType = {
  email: string;
  password: string;
};

export type UserReducerType = {
  authorizationStatus: AuthorizationStatus;
  authInfo: AuthInfoType | null;
  reservations: FullBookingType[];
};
