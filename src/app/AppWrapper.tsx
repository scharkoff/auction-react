import React from 'react';
import { ThemeProvider } from '@mui/material';
import { createCustomTheme } from '../theme';
import { App } from './App';

export function AppWrapper() {
    const [darkMode, setDarkMode] = React.useState(false);

    const theme = createCustomTheme(darkMode);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <App toggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
    );
}
