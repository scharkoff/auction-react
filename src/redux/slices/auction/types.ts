import { IUserData } from '../auth/types';

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

export interface IActionDeletePayload {
    message: string;
    data: {
        id: number;
    };
}

export interface ISliceState {
    data: IAuctionData[];
    loading: boolean;
    errorData: Record<string, unknown>;
    currentAuctionData: IAuctionData;
}

export interface IGetAllAuctions {
    ownerId: number | null;
    sort: string;
    filter: string;
}

export interface IAuctionId {
    id: number;
}

export interface IGetAuctionsBySearchQuery {
    query: string;
}

export interface ICreateAuction {
    title: string;
    description: string;
    startTime: Date | number | null;
    endTime: Date | number | null;
}
