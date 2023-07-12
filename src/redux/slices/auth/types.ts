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

export interface ISliceState {
    data: IUserData;
    loading: boolean;
    errorData: Record<string, unknown>;
    authorization: boolean;
}

export interface IRegisterValues {
    username: string;
    email: string;
    password: string;
}

export type TLoginValues = Omit<IRegisterValues, 'email'>;
