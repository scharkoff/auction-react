import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { IUserData } from './auth';
import { ILotData } from './lots';

export interface IBidData {
    id: number;
    price: number;
    owner_id: number;
    owner: IUserData;
    lot_id: number;
    lot: ILotData;
}

export interface IActionPayload {
    message: string;
    data: IBidData[] | IBidData;
}

interface ISliceState {
    data: IBidData[];
    loading: boolean;
    errorData: Record<string, unknown>;
    currentBidData: IBidData;
}

type TGetBidsByLotId = {
    lotId: number;
};

export const fetchGetAllBids = createAsyncThunk(
    '/api/bid/getAll',
    async ({ lotId = 0 }: TGetBidsByLotId) => {
        try {
            const response = await customAxios.get(`api/bid/getAll/?lot_id=${lotId}`);

            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    },
);

export const fetchGetUserBidByLotId = createAsyncThunk(
    '/api/bid/getUserBidByLotId',
    async ({ lotId = 0 }: TGetBidsByLotId) => {
        try {
            const response = await customAxios.get(`api/bid/getUserBidByLotId/?lot_id=${lotId}`);

            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    },
);

type TCreateBid = {
    lotId: number;
    price: number;
};

export const fetchCreateBid = createAsyncThunk(
    '/api/bid/create',
    async (params: TCreateBid, thunkAPI) => {
        try {
            const response = await customAxios.post('api/bid/create/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

type TUpdateBid = {
    bidId: number;
    price: number;
};

export const fetchUpdateBid = createAsyncThunk(
    '/api/bid/update',
    async (params: TUpdateBid, thunkAPI) => {
        try {
            const response = await customAxios.patch('api/bid/update/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

const initialState: ISliceState = {
    data: [],
    loading: false,
    errorData: {},
    currentBidData: {
        id: 0,
        price: 0,
        owner_id: 0,
        owner: {
            id: 0,
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            is_superuser: false,
            date_joined: '',
            last_login: '',
            is_active: false,
        },
        lot_id: 0,
        lot: {
            id: 0,
            title: '',
            description: '',
            price: 0,
            start_time: '',
            end_time: '',
            owner_id: 0,
            owner: {
                id: 0,
                username: '',
                email: '',
                first_name: '',
                last_name: '',
                is_superuser: false,
                date_joined: '',
                last_login: '',
                is_active: false,
            },
            auction_id: 0,
            auction: {
                id: 0,
                title: '',
                description: '',
                start_time: '',
                end_time: '',
                created: '',
                is_closed: false,
                owner_id: 0,
                owner: {
                    id: 0,
                    username: '',
                    email: '',
                    first_name: '',
                    last_name: '',
                    is_superuser: false,
                    date_joined: '',
                    last_login: '',
                    is_active: false,
                },
            },
            winner_id: null,
            image: '',
        },
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
