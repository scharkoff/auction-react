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
    data: ILotData[] | ILotData;
    loading: boolean;
    errorData: Record<string, unknown>;
}

type TGetAllLots = {
    ownerId: number | null;
};

export const fetchGetAllLots = createAsyncThunk(
    '/api/auth/fetchGetAllLots',
    async ({ ownerId = null }: TGetAllLots) => {
        try {
            let response = null;

            if (ownerId) {
                response = await customAxios.get(`api/lot/getAll/?owner_id=${ownerId}`);
            } else {
                response = await customAxios.get(`api/lot/getAll/`);
            }

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
};

const lotsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllLots.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetAllLots.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    state.data = action.payload?.data;
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

export const lotsReducer = lotsSlice.reducer;
