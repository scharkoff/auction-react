import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { IUserData } from './auth';

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

export const fetchGetAllAuctions = createAsyncThunk(
    '/api/auth/getAll/',
    async ({ ownerId = null, sort = '', filter = '' }: TGetAllAuctions) => {
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

type TCreateAuction = {
    title: string;
    description: string;
    startTime: number;
    endTime: number;
};

export const fetchCreateAuction = createAsyncThunk(
    '/api/auth/create',
    async (params: TCreateAuction) => {
        try {
            const response = await customAxios.post('api/auction/create/', params);

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
                        state.data = action.payload?.data;
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
                state.errorData = action.error;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const auctionActions = auctionSlice.actions;

export const auctionReducer = auctionSlice.reducer;
