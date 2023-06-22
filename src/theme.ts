import { createTheme } from '@mui/material/styles';

export const createCustomTheme = (darkMode: boolean) =>
    createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
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
