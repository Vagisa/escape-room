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
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}
