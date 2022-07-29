import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userAPI } from 'api/api';
import { SnackbarType } from 'app/AppTypes';
import { requestStatus } from 'enums/requestStatus';
import { snackbarType } from 'enums/snackbarType';
import { changeLoggedIn } from 'features/Login/authReducer';
import { sendUserDate } from 'features/Profile/profileReducer';
import { handleError } from 'utils/handleError';

export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (param, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await userAPI.me();

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(sendUserDate(res.data));
      dispatch(changeLoggedIn({ isLoggedIn: true }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);

const slice = createSlice({
  name: 'app',
  initialState: {
    status: requestStatus.IDLE,
    snackbar: {} as SnackbarType,
    isInitialized: false,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: requestStatus }>) {
      state.status = action.payload.status;
    },
    setAppSnackbarValue(
      state,
      action: PayloadAction<{ type: snackbarType | undefined; message: string | null }>,
    ) {
      state.snackbar = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeApp.fulfilled, state => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setAppSnackbarValue } = slice.actions;
