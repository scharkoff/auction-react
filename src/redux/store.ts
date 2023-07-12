import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './slices/auth/auth';
import { lotsReducer } from './slices/lots';
import { auctionReducer } from './slices/auction/auction';
import { bidReducer } from './slices/bid';

const store = configureStore({
    reducer: {
        auth: authReducer,
        lots: lotsReducer,
        auctions: auctionReducer,
        bid: bidReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
