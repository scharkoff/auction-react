import React from 'react';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { createCustomTheme } from '../theme';
import { App } from './App';
import { useAppDispatch } from 'redux/store';
import { mediaActions } from 'redux/slices/utils/media';
import { ScreenSizes } from 'redux/slices/utils/types';

export function AppWrapper() {
    const dispatch = useAppDispatch();

    const [darkMode, setDarkMode] = React.useState(false);

    const theme = createCustomTheme(darkMode);

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        if (isSmallScreen) {
            dispatch(mediaActions.setButtonSize(ScreenSizes.SMALL));
        } else {
            dispatch(mediaActions.setButtonSize(ScreenSizes.MEDIUM));
        }
    }, [isSmallScreen]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <App toggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
    );
}
