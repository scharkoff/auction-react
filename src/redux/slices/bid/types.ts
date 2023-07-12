import { IUserData } from '../auth/types';
import { ILotData } from '../lots';

export interface IBidData {
    id: number;
    price: number;
    owner_id: number;
    owner: IUserData;
    lot_id: number;
    lot: ILotData;
}

export interface IActionPayload {
    message: string;
    data: IBidData[] | IBidData;
}

export interface ISliceState {
    data: IBidData[];
    loading: boolean;
    errorData: Record<string, unknown>;
    currentBidData: IBidData;
}

export interface IGetBidsByLotId {
    lotId: number;
}

export interface ICreateBid {
    lotId: number;
    price: number;
}

export interface IUpdateBid {
    bidId: number;
    price: number;
}
