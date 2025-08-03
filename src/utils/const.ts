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
  All = 'all',
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
  Every = 'every',
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
  [Level.Every]: 'Любой',
  [Level.Easy]: 'Легкий',
  [Level.Medium]: 'Средний',
  [Level.Hard]: 'Сложный',
};
