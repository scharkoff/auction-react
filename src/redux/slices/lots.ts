import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface ILotData {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    owner_id: number;
    auction_id: number;
    winner_id: number | null;
    image: string;
}

export interface IActionPayload {
    message: string;
    data: ILotData[] | ILotData;
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
        auction_id: 0,
        winner_id: null,
        image: '',
    },
};

const lotsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        cleanStateData: (state) => {
            state.data = [];
            state.currentLotData = {
                id: 0,
                title: '',
                description: '',
                start_time: '',
                end_time: '',
                owner_id: 0,
                auction_id: 0,
                winner_id: null,
                image: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllLots.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetAllLots.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (Array.isArray(action.payload?.data)) {
                        state.data = action.payload?.data?.reverse();
                    }
                    state.loading = false;
                },
            )
            .addCase(fetchGetAllLots.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.error;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const lotActions = lotsSlice.actions;

export const lotsReducer = lotsSlice.reducer;
