import iaxios from 'configs/axios';
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

interface IUserData {
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

type LoginValues = {
    username: string;
    password: string;
};

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: LoginValues) => {
    try {
        const response = await iaxios.post('/api/auth/login/', params);

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
});

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
    try {
        const response = await iaxios.get('api/auth/logout/');

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    try {
        const response = await iaxios.post('api/auth/register', params);

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
});

const initialState: ISliceState = {
    data: {
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
                state.errorData = action.error;
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
                    state.data = action.payload?.data;
                    state.loading = false;
                    state.authorization = true;
                },
            )
            .addCase(fetchRegister.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.error;
                state.authorization = false;
                state.loading = false;
            })

            .addCase(fetchLogout.pending, (state: ISliceState) => {
                state.loading = true;
            })
            .addCase(fetchLogout.fulfilled, (state: ISliceState) => {
                state.loading = false;
                state.data = {
                    id: 0,
                    username: '',
                    email: '',
                    first_name: '',
                    last_name: '',
                    is_superuser: false,
                    date_joined: '',
                    last_login: '',
                    is_active: false,
                };
                state.authorization = false;
            })
            .addCase(fetchLogout.rejected, (state: ISliceState, action: any) => {
                state.errorData = action.payload;
                state.authorization = false;
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.authorization;

export const authReducer = authSlice.reducer;
