import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingReducerType } from '../../types/booking';
import { NameSpace } from '../../utils/const';
import { FullQuestType } from '../../types/quest';
import { fetchQuestAction } from '../api-actions';

const initialState: BookingReducerType = {
  quest: null,
  isQuestPageLoading: false,
};

export const bookingReducer = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {
    setQuest: (state, action: PayloadAction<FullQuestType>) => {
      state.quest = action.payload;
    },
    resetQuestData: (state) => {
      state.quest = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestAction.pending, (state) => {
        state.isQuestPageLoading = true;
      })
      .addCase(fetchQuestAction.fulfilled, (state, action) => {
        state.quest = action.payload;
        state.isQuestPageLoading = false;
      })
      .addCase(fetchQuestAction.rejected, (state) => {
        state.isQuestPageLoading = false;
      });
  }
});

export const { setQuest, resetQuestData } = bookingReducer.actions;
