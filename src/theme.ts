import { createTheme } from '@mui/material/styles';

export const createCustomTheme = (darkMode: boolean) =>
    createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',

            primary: {
                light: '#5393ff',
                main: '#2979ff',
                dark: '#1c54b2',
            },
        },

        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                },
            },
        },
    });
