import { BookingDate } from '../utils/const';
import { QuestType } from './quest';

export type BookingUserType = {
  date: BookingDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

export type TimeSlotType = {
  time: string;
  isAvailable: boolean;
};

export type LocationType = {
  address: string;
  coords: [number, number];
};

export type BookingInformationType = {
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
