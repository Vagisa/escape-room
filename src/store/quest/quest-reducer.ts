import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestReducerType, QuestType } from '../../types/quest';
import { Level, NameSpace, QuestGenre } from '../../utils/const';
import { fetchQuestsAction } from '../api-actions';

const initialState: QuestReducerType = {
  quests: [],
  isQuestsLoading: false,
  hasError: false,
  genre: QuestGenre.All,
  level: Level.Every,
};

export const questReducer = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<QuestGenre>) => {
      state.genre = action.payload;
    },
    changeLevel: (state, action: PayloadAction<Level>) => {
      state.level = action.payload;
    },
    // resetFilters: (state) => {
    //   state.genre = QuestGenre.All;
    //   state.level = Level.Every;
    // },
    updateQuest: (state, action: PayloadAction<QuestType>) => {
      state.quests = state.quests.map((quest) =>
        quest.id === action.payload.id ? action.payload : quest
      );
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isQuestsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsLoading = false;
        state.genre = QuestGenre.All;
        state.level = Level.Every;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isQuestsLoading = false;
        state.hasError = true;
      });
  }
});

export const { updateQuest, changeGenre, changeLevel } = questReducer.actions;
