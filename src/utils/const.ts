import { BookingInfoType } from '../types/booking';

export const CONTACT_PLACES: BookingInfoType[] = [
  {
    id: '1',
    location: {
      address: 'Санкт-Петербург, Набережная реки Карповки, д 5П',
      coords: [59.9703, 30.3136],
    },
    slots: {
      today: [],
      tomorrow: [],
    },
  },
];

export const CONTACT_INFO = {
  city: 'Санкт-Петербург',
  address: 'Набережная реки Карповка, д 5П',
  working: 'Ежедневно',
  hours: {
    from: '10:00',
    to: '22:00',
  },
  email: 'info@escape-room.ru',
  phone: {
    raw: '80001111111',
    formatted: '8 (000) 111-11-11',
  }
};

export enum AppRoute {
  Root = '/',
  Quest = '/quest/:id',
  Contacts = '/contacts',
  Login = '/login',
  Booking = '/quest/:id/booking',
  MyQuests = '/my-quests',
  NotFound = '*',
}

export enum QuestGenre {
  All = 'all-quests',
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export enum BookingDate {
  Today = 'today',
  Tomorrow = 'tomorrow',
}

export enum Level {
  Any = 'any',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum APIRoute {
  Quest = '/quest/',
  Quests = '/quest',
  Booking = '/booking',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Quest = 'QUEST',
  Booking = 'BOOKING',
  User = 'USER',
}

export const GenreLabels: Record<QuestGenre, string> = {
  [QuestGenre.All]: 'Все квесты',
  [QuestGenre.Adventures]: 'Приключения',
  [QuestGenre.Horror]: 'Ужасы',
  [QuestGenre.Mystic]: 'Мистика',
  [QuestGenre.Detective]: 'Детектив',
  [QuestGenre.SciFi]: 'Sci-fi',
};

export const LevelLabels: Record<Level, string> = {
  [Level.Any]: 'Любой',
  [Level.Easy]: 'Легкий',
  [Level.Medium]: 'Средний',
  [Level.Hard]: 'Сложный',
};

export const BookingDateLabel: Record<BookingDate, string> = {
  [BookingDate.Today]: 'сегодня',
  [BookingDate.Tomorrow]: 'завтра',
};

export const SvgGenreWidth: Record<QuestGenre, string> = {
  [QuestGenre.All]: '26',
  [QuestGenre.Adventures]: '36',
  [QuestGenre.Horror]: '30',
  [QuestGenre.Mystic]: '30',
  [QuestGenre.Detective]: '40',
  [QuestGenre.SciFi]: '28',
};
