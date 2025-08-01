import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullQuestType, QuestType } from '../types/quest';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../utils/const';
import { BookingInfoType, FullBookingType, PostBookingArg } from '../types/booking';
import { AuthDataType, AuthInfoType } from '../types/user';
import { dropToken, saveToken } from '../services/token';

export const fetchQuestsAction = createAsyncThunk<QuestType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quest/fetchQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<QuestType[]>(APIRoute.Quests);

    return data;
  },
);


export const fetchQuestAction = createAsyncThunk<FullQuestType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quest/fetchQuest',
  async (questId, { extra: api }) => {
    const { data } = await api.get<FullQuestType>(APIRoute.Quest + questId);

    return data;
  },
);

export const fetchBookingInfoAction = createAsyncThunk<BookingInfoType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/fetchBookingInfo',
  async (questId, { extra: api }) => {
    const { data } = await api.get<BookingInfoType[]>(APIRoute.Quest + questId + APIRoute.Booking);

    return data;
  },
);

export const postBookingAction = createAsyncThunk<FullBookingType, PostBookingArg, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/postBooking',
  async ({questId, bookingUserData}, {dispatch, extra: api}) => {
    const {data} = await api.post<FullBookingType>
    (APIRoute.Quest + questId + APIRoute.Booking, bookingUserData);
    dispatch(fetchBookingInfoAction(data.id));
    return data;
  }
);

export const fetchReservationAction = createAsyncThunk<FullBookingType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchReservation',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FullBookingType[]>(APIRoute.Reservation);

    return data;
  }
);

export const deleteReservationAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/deletereservation',
  async (reservationId, { extra: api }) => {
    await api.delete(`${APIRoute.Reservation}/${reservationId}`);
    return reservationId;
  }
);

export const checkAuthAction = createAsyncThunk<AuthInfoType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthInfoType>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunk<AuthInfoType, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, { extra: api }) => {
    const {data} = await api.post<AuthInfoType>(APIRoute.Login, {email, password});
    saveToken(data.token);

    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
