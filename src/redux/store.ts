import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './slices/auth/auth';
import { lotsReducer } from './slices/lot/lot';
import { auctionReducer } from './slices/auction/auction';
import { bidReducer } from './slices/bid/bid';
import { mediaReducer } from './slices/utils/media';

const store = configureStore({
    reducer: {
        auth: authReducer,
        lots: lotsReducer,
        auctions: auctionReducer,
        bid: bidReducer,
        media: mediaReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
