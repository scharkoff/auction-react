import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { emptyLotData } from '../data';
import {
    IActionPayload,
    ICreateLot,
    IGetAllLots,
    IGetLotById,
    ILotDeletePayload,
    ILotId,
    ISliceState,
} from './types';

export const fetchGetAllLots = createAsyncThunk(
    '/api/lot/fetchGetAllLots',
    async ({ ownerId = 0, auctionId = 0 }: IGetAllLots, thunkAPI) => {
        try {
            const response = await customAxios.get(
                `api/lot/getAll/?owner_id=${ownerId}&auction_id=${auctionId}`,
            );

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                'response' in error
                    ? { ...error.response.data, status: error.response.status }
                    : {},
            );
        }
    },
);

export const fetchGetLotById = createAsyncThunk(
    '/api/lot/fetchGetLotById',
    async ({ id = 0 }: IGetLotById, thunkAPI) => {
        try {
            const response = await customAxios.get(`api/lot/getById/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                'response' in error
                    ? { ...error.response.data, status: error.response.status }
                    : {},
            );
        }
    },
);

export const fetchCreateLot = createAsyncThunk(
    '/api/lot/fetchCreateLot',
    async (params: ICreateLot, thunkAPI) => {
        try {
            const response = await customAxios.post('api/lot/create/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                'response' in error
                    ? { ...error.response.data, status: error.response.status }
                    : {},
            );
        }
    },
);

export const fetchDeleteLot = createAsyncThunk(
    '/api/lot/fetchDeleteLot',
    async ({ id }: ILotId, thunkAPI) => {
        try {
            const response = await customAxios.delete(`api/lot/delete/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                'response' in error
                    ? { ...error.response.data, status: error.response.status }
                    : {},
            );
        }
    },
);

export const fetchFinishLot = createAsyncThunk(
    '/api/lot/fetchFinishLot',
    async ({ id }: ILotId, thunkAPI) => {
        try {
            const response = await customAxios.post(`api/lot/finish/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                'response' in error
                    ? { ...error.response.data, status: error.response.status }
                    : {},
            );
        }
    },
);

export const fetchCheckLotStatus = createAsyncThunk(
    '/api/lot/fetchCheckLotStatus',
    async ({ id }: ILotId, thunkAPI) => {
        try {
            const response = await customAxios.get(`api/lot/checkStatus/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                'response' in error
                    ? { ...error.response.data, status: error.response.status }
                    : {},
            );
        }
    },
);

const initialState: ISliceState = {
    data: [],
    loading: false,
    errorData: {},
    currentLotData: {
        ...emptyLotData,
    },
};

const lotsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFinishLot.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchFinishLot.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentLotData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchFinishLot.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchCheckLotStatus.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchCheckLotStatus.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentLotData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchCheckLotStatus.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchGetLotById.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetLotById.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentLotData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchGetLotById.rejected, (state: ISliceState, action: any) => {
                state.currentLotData = { ...emptyLotData };
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchGetAllLots.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetAllLots.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (Array.isArray(action.payload?.data)) {
                        state.data = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchGetAllLots.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchCreateLot.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchCreateLot.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentLotData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchCreateLot.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchDeleteLot.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchDeleteLot.fulfilled,
                (state: ISliceState, action: PayloadAction<ILotDeletePayload>) => {
                    state.data = state.data.filter((lot) => lot?.id !== action.payload?.data?.id);
                    state.loading = false;
                },
            )
            .addCase(fetchDeleteLot.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const lotActions = lotsSlice.actions;

export const lotsReducer = lotsSlice.reducer;
