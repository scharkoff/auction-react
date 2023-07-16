import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISliceState, ScreenSizes } from './types';

const initialState: ISliceState = {
    buttonSize: ScreenSizes.MEDIUM,
};

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setButtonSize: (state: ISliceState, action: PayloadAction<ScreenSizes>) => {
            state.buttonSize = action.payload;
        },
    },
    extraReducers: {},
});

export const mediaActions = mediaSlice.actions;

export const mediaReducer = mediaSlice.reducer;
