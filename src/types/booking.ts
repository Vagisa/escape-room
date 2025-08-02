import { BookingDate } from '../utils/const';
import { FullQuestType, QuestType } from './quest';

export type BookingUserType = {
  date: BookingDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

export type PostBookingArg = {
  questId: string;
  bookingUserData: BookingUserType;
};

export type TimeSlotType = {
  time: string;
  isAvailable: boolean;
};

export type LocationType = {
  address: string;
  coords: [number, number];
};

export type BookingInfoType = {
  id: string;
  location: LocationType;
  slots: {
    today: TimeSlotType[];
    tomorrow: TimeSlotType[];
  };
};

type BookingRemovedKeys = 'placeId';

export type FullBookingType = Omit<BookingUserType, BookingRemovedKeys> & {
  id: string;
  location: LocationType;
  quest: QuestType;
};

export type BookingReducerType = {
  quest: FullQuestType | null;
  bookings: BookingInfoType[];
  isQuestPageLoading: boolean;
};
