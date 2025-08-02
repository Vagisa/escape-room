import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

const selectQuests = (state: Pick<State, NameSpace.Quest>) => state[NameSpace.Quest].quests;
const selectErrorStatus = (state: Pick<State, NameSpace.Quest>) => state[NameSpace.Quest].hasError;
const selectQuestsLoadingStatus = (state: Pick<State, NameSpace.Quest>) =>
  state[NameSpace.Quest].isQuestsLoading;

export { selectQuests, selectErrorStatus, selectQuestsLoadingStatus };
