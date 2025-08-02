import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

const selectBookings = (state: Pick<State, NameSpace.Booking>) => state[NameSpace.Booking].bookings;
const selectQuest = (state: Pick<State, NameSpace.Booking>) => state[NameSpace.Booking].quest;
const selectQuestPageLoading = (state: Pick<State, NameSpace.Booking>) =>
  state[NameSpace.Booking].isQuestPageLoading;

export { selectBookings, selectQuest, selectQuestPageLoading };
