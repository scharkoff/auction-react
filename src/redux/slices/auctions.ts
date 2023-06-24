import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface IAuctionData {
    id: number;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    is_closed: boolean;
    owner_id: number;
}

export interface IActionPayload {
    message: string;
    data: IAuctionData[] | IAuctionData;
}

interface ISliceState {
    data: IAuctionData[] | IAuctionData;
    loading: boolean;
    errorData: Record<string, unknown>;
}

type TGetAllAuctions = {
    ownerId: number | null;
};

export const fetchGetAllAuctions = createAsyncThunk(
    '/api/auth/fetchGetAllAuctions',
    async ({ ownerId = null }: TGetAllAuctions) => {
        try {
            let response = null;

            if (ownerId) {
                response = await customAxios.get(`api/auction/getAll/?owner_id=${ownerId}`);
            } else {
                response = await customAxios.get(`api/auction/getAll/`);
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

const auctionSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllAuctions.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetAllAuctions.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    state.data = action.payload?.data;
                    state.loading = false;
                },
            )
            .addCase(fetchGetAllAuctions.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.error;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const auctionReducer = auctionSlice.reducer;
