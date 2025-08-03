import { QuestType } from '../types/quest';

const addImageSuffix = (url: string): string =>
  url.replace(/\.(webp|jpe?g|png)$/, '@2x.$1');

const getFilteredQuests = <K extends keyof QuestType>(
  quests: QuestType[],
  key: K,
  value: QuestType[K]
): QuestType[] => quests.filter((quest) => quest[key] === value);

export { addImageSuffix, getFilteredQuests };
