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
    data: IAuctionData[];
    loading: boolean;
    errorData: Record<string, unknown>;
    currentAuctionData: IAuctionData;
}

type TGetAllAuctions = {
    ownerId: number | null;
};

export const fetchGetAllAuctions = createAsyncThunk(
    '/api/auth/getAll/',
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

type TAuctionGetById = {
    id: number | string;
};

export const fetchAuctionGetById = createAsyncThunk(
    '/api/auth/getById',
    async ({ id }: TAuctionGetById) => {
        try {
            id = +id;

            const response = await customAxios.get(`api/auction/getById/?id=${id}`);

            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    },
);

type TGetAuctionsBySearchQuery = {
    query: string;
};

export const fetchAuctionsBySearchQuery = createAsyncThunk(
    '/api/auth/search',
    async ({ query }: TGetAuctionsBySearchQuery) => {
        try {
            const response = await customAxios.get(`api/auction/search/?query=${query}`);

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
    currentAuctionData: {
        id: 0,
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        is_closed: false,
        owner_id: 0,
    },
};

const auctionSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        cleanAuctionData: (state) => {
            state.currentAuctionData = {
                id: 0,
                title: '',
                description: '',
                start_time: '',
                end_time: '',
                is_closed: false,
                owner_id: 0,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllAuctions.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchGetAllAuctions.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (Array.isArray(action.payload?.data)) {
                        state.data = action.payload?.data?.reverse();
                    }

                    state.loading = false;
                },
            )
            .addCase(fetchGetAllAuctions.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.error;
                state.loading = false;
            })

            .addCase(fetchAuctionGetById.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchAuctionGetById.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentAuctionData = action.payload?.data;
                    }

                    state.loading = false;
                },
            )
            .addCase(fetchAuctionGetById.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.error;
                state.loading = false;
            })

            .addCase(fetchAuctionsBySearchQuery.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchAuctionsBySearchQuery.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (Array.isArray(action.payload?.data)) {
                        state.data = action.payload?.data;
                    }

                    state.loading = false;
                },
            )
            .addCase(fetchAuctionsBySearchQuery.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.error;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const auctionActions = auctionSlice.actions;

export const auctionReducer = auctionSlice.reducer;
