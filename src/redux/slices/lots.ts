import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { IUserData } from './auth';
import { IAuctionData } from './auctions';

export interface ILotData {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    owner_id: number;
    owner: IUserData;
    auction_id: number;
    auction: IAuctionData;
    winner_id: number | null;
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
    '/api/auth/fetchGetAllLots',
    async ({ ownerId = 0, auctionId = 0 }: TGetAllLots) => {
        try {
            const response = await customAxios.get(
                `api/lot/getAll/?owner_id=${ownerId}&auction_id=${auctionId}`,
            );

            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    },
);

type TGetLotById = {
    id: number;
};

export const fetchLotById = createAsyncThunk(
    '/api/lot/getById/',
    async ({ id = 0 }: TGetLotById) => {
        try {
            const response = await customAxios.get(`api/lot/getById/?id=${id}`);

            return response.data;
        } catch (error: any) {
            throw new Error(error);
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
    '/api/lot/create',
    async (params: TCreateLot, thunkAPI) => {
        try {
            const response = await customAxios.post('api/lot/create/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

type TDeleteLot = {
    id: number;
};

export const fetchDeleteLot = createAsyncThunk('/api/lot/delete', async ({ id }: TDeleteLot) => {
    try {
        const response = await customAxios.delete(`api/lot/delete/?id=${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
});

const initialState: ISliceState = {
    data: [],
    loading: false,
    errorData: {},
    currentLotData: {
        id: 0,
        title: '',
        description: '',
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
};

const lotsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLotById.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchLotById.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentLotData = action.payload?.data;
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchLotById.rejected, (state: ISliceState, action: any) => {
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
