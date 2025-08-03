import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

const selectQuest = (state: Pick<State, NameSpace.Booking>) => state[NameSpace.Booking].quest;
const selectQuestPageLoading = (state: Pick<State, NameSpace.Booking>) =>
  state[NameSpace.Booking].isQuestPageLoading;

export { selectQuest, selectQuestPageLoading };
