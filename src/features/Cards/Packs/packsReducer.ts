import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { packAPI } from 'api/cardsAPI';
import { CreatePackDataType, PacksParamsType, UpdatePackDataType } from 'api/DataTypes';
import { GetPacksResponseType } from 'api/ResponseTypes';
import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { snackbarType } from 'common/enums/snackbarType';
import { handleError } from 'common/utils/handleError';

export const loadPacks = createAsyncThunk(
  'packs/loadPacks',
  async (param: PacksParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.getPacks(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const createPack = createAsyncThunk(
  'packs/createPack',
  async (
    params: { data: CreatePackDataType; params: PacksParamsType },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.createPack(params.data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      await dispatch(loadPacks(params.params));

      dispatch(
        setAppSnackbarValue({
          type: snackbarType.SUCCESS,
          message: `Pack "${res.data.newCardsPack.name}" created.`,
        }),
      );
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const updatePack = createAsyncThunk(
  'packs/updatePack',
  async (
    params: { data: UpdatePackDataType; params: PacksParamsType; loadPacks: boolean },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.updatePack(params.data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      if (params.loadPacks) {
        await dispatch(loadPacks(params.params));
      }

      dispatch(
        setAppSnackbarValue({
          type: snackbarType.SUCCESS,
          message: `Pack "${res.data.updatedCardsPack.name}" updated.`,
        }),
      );

      return res.data.updatedCardsPack.name;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const deletePack = createAsyncThunk(
  'packs/deletePack',
  async (
    params: { packId: string; params: PacksParamsType; loadPacks: boolean },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.deletePack(params.packId);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      if (params.loadPacks) {
        await dispatch(loadPacks(params.params));

        dispatch(
          setAppSnackbarValue({
            type: snackbarType.SUCCESS,
            message: `Pack "${res.data.deletedCardsPack.name}" deleted.`,
          }),
        );
      }
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'packs',
  initialState: {
    cardPacks: [
      {
        _id: '',
        user_id: '',
        user_name: '',
        private: false,
        name: '',
        path: '',
        grade: 0,
        shots: 0,
        cardsCount: 0,
        type: '',
        rating: 0,
        created: '',
        updated: '',
        more_id: '',
        __v: 0,
        deckCover: '',
      },
    ],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
  } as GetPacksResponseType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPacks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const packsReducer = slice.reducer;
