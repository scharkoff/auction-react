import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './slices/auth';
import { lotsReducer } from './slices/lots';
import { auctionReducer } from './slices/auctions';

const store = configureStore({
    reducer: {
        auth: authReducer,
        lots: lotsReducer,
        auctions: auctionReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
