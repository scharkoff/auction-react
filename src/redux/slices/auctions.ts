import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { IUserData } from './auth';
import { emptyAuctionData } from './data';

export interface IAuctionData {
    id: number;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    created: string;
    is_closed: boolean;
    owner_id: number;
    owner: IUserData;
}

export interface IActionPayload {
    message: string;
    data: IAuctionData[] | IAuctionData;
}

interface IActionDeletePayload {
    message: string;
    data: {
        id: number;
    };
}

interface ISliceState {
    data: IAuctionData[];
    loading: boolean;
    errorData: Record<string, unknown>;
    currentAuctionData: IAuctionData;
}

type TGetAllAuctions = {
    ownerId: number | null;
    sort: string;
    filter: string;
};

interface IAuctionId {
    id: number;
}

export const fetchGetAllAuctions = createAsyncThunk(
    '/api/auction/fetchGetAllAuctions',
    async ({ ownerId = null, sort = '', filter = '' }: TGetAllAuctions, thunkAPI) => {
        try {
            let response = null;

            if (ownerId) {
                response = await customAxios.get(
                    `api/auction/getAll/?owner_id=${ownerId}&sort=${sort}&filter=${filter}`,
                );
            } else if (sort || filter) {
                response = await customAxios.get(
                    `api/auction/getAll/?sort=${sort}&filter=${filter}`,
                );
            } else {
                response = await customAxios.get(`api/auction/getAll/`);
            }

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

export const fetchAuctionGetById = createAsyncThunk(
    '/api/auction/fetchAuctionGetById',
    async ({ id }: IAuctionId, thunkAPI) => {
        try {
            const response = await customAxios.get(`api/auction/getById/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

type TGetAuctionsBySearchQuery = {
    query: string;
};

export const fetchAuctionsBySearchQuery = createAsyncThunk(
    '/api/auction/fetchAuctionsBySearchQuery',
    async ({ query }: TGetAuctionsBySearchQuery, thunkAPI) => {
        try {
            const response = await customAxios.get(`api/auction/search/?query=${query}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

type TCreateAuction = {
    title: string;
    description: string;
    startTime: Date | number | null;
    endTime: Date | number | null;
};

export const fetchCreateAuction = createAsyncThunk(
    '/api/auction/fetchCreateAuction',
    async (params: TCreateAuction, thunkAPI) => {
        try {
            const response = await customAxios.post('api/auction/create/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

export const fetchDeleteAuction = createAsyncThunk(
    '/api/auction/fetchDeleteAuction',
    async ({ id }: IAuctionId, thunkAPI) => {
        try {
            const response = await customAxios.delete(`api/auction/delete/?id=${id}`);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

export const fetchCloseAuction = createAsyncThunk(
    '/api/auction/fetchCloseAuction',
    async ({ id }: IAuctionId, thunkAPI) => {
        try {
            const response = await customAxios.post(`api/auction/close/?id=${id}`);

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
    currentAuctionData: {
        ...emptyAuctionData,
    },
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
                    if (Array.isArray(action.payload?.data)) {
                        state.data = action.payload?.data;
                    }

                    state.loading = false;
                },
            )
            .addCase(fetchGetAllAuctions.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload;
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
                state.currentAuctionData = { ...emptyAuctionData };
                state.errorData = action.payload?.response?.data;
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
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchCreateAuction.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchCreateAuction.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    if (!Array.isArray(action.payload?.data)) {
                        state.currentAuctionData = action.payload?.data;
                    }

                    state.loading = false;
                },
            )
            .addCase(fetchCreateAuction.rejected, (state: ISliceState, action: any) => {
                state.currentAuctionData = { ...emptyAuctionData };
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            })

            .addCase(fetchDeleteAuction.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(
                fetchDeleteAuction.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionDeletePayload>) => {
                    state.data = state.data.filter(
                        (auction) => auction?.id !== action.payload?.data?.id,
                    );
                    state.loading = false;
                },
            )
            .addCase(fetchDeleteAuction.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const auctionActions = auctionSlice.actions;

export const auctionReducer = auctionSlice.reducer;
