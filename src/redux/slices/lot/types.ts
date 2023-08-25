import { IAuctionData } from '../auction/types';
import { IUserData } from '../auth/types';

export interface ILotData {
    id: number;
    title: string;
    description: string;
    price: number;
    start_time: string;
    end_time: string;
    is_closed: Boolean;
    owner_id: number;
    owner: IUserData;
    auction_id: number;
    auction: IAuctionData;
    winner_id: number | null;
    winner: IUserData;
    image: string;
}

export interface IActionPayload {
    message: string;
    data: ILotData[] | ILotData;
}

export interface ILotDeletePayload {
    message: string;
    data: {
        id: number;
    };
}

export interface ISliceState {
    data: ILotData[];
    loading: boolean;
    errorData: Record<string, unknown>;
    currentLotData: ILotData;
}

export interface IGetAllLots {
    ownerId: number;
    auctionId: number;
}

export interface IGetLotById {
    id: number;
}

export interface ICreateLot {
    title: string;
    description: string;
    startTime: Date | number | null;
    endTime: Date | number | null;
}

export interface ILotId {
    id: number;
}
