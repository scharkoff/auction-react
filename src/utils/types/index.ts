import { ILotData } from '../../redux/slices/lot/types';

export interface IResponse {
    message: string;
    payload: {
        message: string;
        data: any;
    };
    type: string;
}

export interface IRejectedResponse {
    error: any;
    payload: {
        response: {
            data: any;
            status: number;
        };
    };
}

export interface ICreateLotResponse extends IResponse {
    payload: {
        message: string;
        data: ILotData;
    };
}
