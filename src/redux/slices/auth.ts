import customAxios from 'configs/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { emptyUserData } from './data';

export interface IUserData {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
    date_joined: string;
    last_login: string;
    is_active: boolean;
}

export interface IActionPayload {
    message: string;
    data: IUserData;
}

interface ISliceState {
    data: IUserData;
    loading: boolean;
    errorData: Record<string, unknown>;
    authorization: boolean;
}

export type TRegisterValues = {
    username: string;
    email: string;
    password: string;
};

export type TLoginValues = Omit<TRegisterValues, 'email'>;

export const fetchLogin = createAsyncThunk(
    '/api/auth/fetchLogin',
    async (params: TLoginValues, thunkAPI) => {
        try {
            const response = await customAxios.post('/api/auth/login/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

export const fetchAuth = createAsyncThunk('/api/auth/getSessionUserData', async (_, thunkAPI) => {
    try {
        const response = await customAxios.get('api/auth/getSessionUserData/');

        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
    }
});

export const fetchLogout = createAsyncThunk('/api/auth/fetchLogout', async (_, thunkAPI) => {
    try {
        const response = await customAxios.get('api/auth/logout/');

        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
    }
});

export const fetchRegister = createAsyncThunk(
    '/api/auth/fetchRegister',
    async (params: TRegisterValues, thunkAPI) => {
        try {
            const response = await customAxios.post('api/auth/register/', params);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue('response' in error ? error.response.data : {});
        }
    },
);

const initialState: ISliceState = {
    data: {
        ...emptyUserData,
    },
    loading: false,
    errorData: {},
    authorization: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state: ISliceState) => {
                state.loading = true;
                state.authorization = false;
            })
            .addCase(
                fetchLogin.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    state.data = action.payload?.data;
                    state.loading = false;
                    state.authorization = true;
                },
            )
            .addCase(fetchLogin.rejected, (state: ISliceState, action: any) => {
                state.data = { ...emptyUserData };
                state.errorData = action.payload?.response?.data;
                state.authorization = false;
                state.loading = false;
            })

            .addCase(fetchAuth.pending, (state: ISliceState) => {
                state.loading = true;
                state.authorization = false;
            })
            .addCase(
                fetchAuth.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    state.data = action.payload?.data;
                    state.loading = false;
                    state.authorization = true;
                },
            )
            .addCase(fetchAuth.rejected, (state: ISliceState, action: any) => {
                state.data = { ...emptyUserData };
                state.errorData = action.payload?.response?.data;
                state.authorization = false;
                state.loading = false;
            })

            .addCase(fetchRegister.pending, (state: ISliceState) => {
                state.loading = true;
                state.authorization = false;
            })
            .addCase(
                fetchRegister.fulfilled,
                (state: ISliceState, action: PayloadAction<IActionPayload>) => {
                    // state.data = action.payload?.data;
                    state.loading = false;
                    state.authorization = false;
                },
            )
            .addCase(fetchRegister.rejected, (state: ISliceState, action: any) => {
                state.data = { ...emptyUserData };
                state.errorData = action.payload?.response?.data;
                state.authorization = false;
                state.loading = false;
            })

            .addCase(fetchLogout.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(fetchLogout.fulfilled, (state: ISliceState) => {
                state.data = { ...emptyUserData };
                state.loading = false;
                state.authorization = false;
            })
            .addCase(fetchLogout.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload?.response?.data;
                state.authorization = false;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const authReducer = authSlice.reducer;
