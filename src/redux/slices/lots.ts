import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { IUserData } from './auth';
import { IAuctionData } from './auctions';
import { emptyLotData } from './data';

export interface ILotData {
    id: number;
    title: string;
    description: string;
    price: number;
    start_time: string;
    end_time: string;
    owner_id: number;
    owner: IUserData;
    auction_id: number;
    auction: IAuctionData;
    winner_id: number | null;
    winner: IUserData;
    image: string;
}

export interface IActionPayload {
    message: string;
    data: ILotData[] | ILotData;
}

interface ILotDeletePayload {
    message: string;
    data: {
        id: number;
    };
}

interface ISliceState {
    data: ILotData[];
    loading: boolean;
    errorData: Record<string, unknown>;
    currentLotData: ILotData;
}

type TGetAllLots = {
    ownerId: number;
    auctionId: number;
};

export const fetchGetAllLots = createAsyncThunk(
    '/api/lot/fetchGetAllLots',
    async ({ ownerId = 0, auctionId = 0 }: TGetAllLots, thunkAPI) => {
        try {
            const response = await customAxios.get(
                `api/lot/getAll/?owner_id=${ownerId}&auction_id=${auctionId}`,
            );

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

type TGetLotById = {
    id: number;
};

export const fetchGetLotById = createAsyncThunk(
    '/api/lot/fetchGetLotById',
    async ({ id = 0 }: TGetLotById, thunkAPI) => {
        try {
            const response = await customAxios.get(`api/lot/getById/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

type TCreateLot = {
    title: string;
    description: string;
    startTime: Date | number | null;
    endTime: Date | number | null;
};

export const fetchCreateLot = createAsyncThunk(
    '/api/lot/fetchCreateLot',
    async (params: TCreateLot, thunkAPI) => {
        try {
            const response = await customAxios.post('api/lot/create/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

type TLotId = {
    id: number;
};

export const fetchDeleteLot = createAsyncThunk(
    '/api/lot/fetchDeleteLot',
    async ({ id }: TLotId, thunkAPI) => {
        try {
            const response = await customAxios.delete(`api/lot/delete/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

export const fetchFinishLot = createAsyncThunk(
    '/api/lot/fetchFinishLot',
    async ({ id }: TLotId, thunkAPI) => {
        try {
            const response = await customAxios.post(`api/lot/finish/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
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
                state.currentLotData = { ...emptyLotData };
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
