import { Level, QuestGenre } from '../utils/const';

export type QuestType = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: Level;
  type: QuestGenre;
  peopleMinMax: [number, number];
};

export type FullQuestType = QuestType & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type QuestReducerType = {
  quests: QuestType[];
  isQuestsLoading: boolean;
  hasError: boolean;
};
