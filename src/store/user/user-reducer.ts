import { createSlice } from '@reduxjs/toolkit';
import { UserReducerType } from '../../types/user.ts';
import { AuthorizationStatus, NameSpace } from '../../utils/const.ts';
import {
  checkAuthAction,
  deleteReservationAction,
  fetchBookingInfoAction,
  fetchReservationAction,
  loginAction,
  logoutAction } from '../api-actions.ts';

const initialState: UserReducerType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  reservations: [],
  bookings: [],
  isBookingPageLoading: false,
  isMyQuestsPageLoading: false,
};

export const userReducer = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    resetUserReservations: (state) => {
      state.reservations = [];
    },
    resetBookings: (state) => {
      state.bookings = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authInfo = null;
        state.reservations = [];
      })
      .addCase(fetchReservationAction.fulfilled, (state, action) => {
        state.reservations = action.payload;
      })
      .addCase(deleteReservationAction.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== action.payload);
      })
      .addCase(fetchBookingInfoAction.pending, (state) => {
        state.isBookingPageLoading = true;
      })
      .addCase(fetchBookingInfoAction.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.isBookingPageLoading = false;
      })
      .addCase(fetchBookingInfoAction.rejected, (state) => {
        if (state.authInfo) {
          state.isBookingPageLoading = false;
        }
      });
  }
});

export const { resetBookings, resetUserReservations } = userReducer.actions;
