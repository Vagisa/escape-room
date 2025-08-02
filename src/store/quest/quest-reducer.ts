import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestReducerType, QuestType } from '../../types/quest';
import { NameSpace } from '../../utils/const';
import { fetchQuestsAction } from '../api-actions';

const initialState: QuestReducerType = {
  quests: [],
  isQuestsLoading: false,
  hasError: false,
};

export const questReducer = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {
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
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isQuestsLoading = false;
        state.hasError = true;
      });
  }
});

export const { updateQuest } = questReducer.actions;
