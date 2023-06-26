import { ILotData } from '../../redux/slices/lots';

export interface IResponse {
    error?: {
        message: string;
        name: string;
        stack: string;
    };
    message: string;
    payload: {
        message: string;
        data: any;
    };
    type: string;
}

export interface ICreateLotResponse extends IResponse {
    payload: {
        message: string;
        data: ILotData;
    };
}
