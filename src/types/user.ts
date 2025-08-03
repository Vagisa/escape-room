import { AuthorizationStatus } from '../utils/const';
import { BookingInfoType, FullBookingType } from './booking';

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
  bookings: BookingInfoType[];
  isBookingPageLoading: boolean;
  isMyQuestsPageLoading: boolean;
};
