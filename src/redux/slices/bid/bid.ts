import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { emptyBidData } from '../data';
import { IActionPayload, ICreateBid, IGetBidsByLotId, ISliceState, IUpdateBid } from './types';

export const fetchGetAllBids = createAsyncThunk(
    '/api/bid/fetchGetAllBids',
    async ({ lotId = 0 }: IGetBidsByLotId, thunkAPI) => {
        try {
            const response = await customAxios.get(`api/bid/getAll/?lot_id=${lotId}`);

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

export const fetchGetUserBidByLotId = createAsyncThunk(
    '/api/bid/fetchGetUserBidByLotId',
    async ({ lotId = 0 }: IGetBidsByLotId, thunkAPI) => {
        try {
            const response = await customAxios.get(`api/bid/getUserBidByLotId/?lot_id=${lotId}`);

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

export const fetchCreateBid = createAsyncThunk(
    '/api/bid/fetchCreateBid',
    async (params: ICreateBid, thunkAPI) => {
        try {
            const response = await customAxios.post('api/bid/create/', params);

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

export const fetchUpdateBid = createAsyncThunk(
    '/api/bid/fetchUpdateBid',
    async (params: IUpdateBid, thunkAPI) => {
        try {
            const response = await customAxios.patch('api/bid/update/', params);

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
    currentBidData: {
        ...emptyBidData,
    },
};

const bidSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUserBidByLotId.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetUserBidByLotId.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentBidData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchGetUserBidByLotId.rejected, (state: ISliceState, action: any) => {
                state.currentBidData = { ...emptyBidData };
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchGetAllBids.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetAllBids.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (Array.isArray(action.payload?.data)) {
                        state.data = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchGetAllBids.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchCreateBid.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchCreateBid.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentBidData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchCreateBid.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchUpdateBid.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchUpdateBid.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentBidData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchUpdateBid.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const bidActions = bidSlice.actions;

export const bidReducer = bidSlice.reducer;
