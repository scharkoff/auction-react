import React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface IAlertMessage {
    open: boolean;
    alertText: string;
    alertType: AlertColor;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AlertMessage({ open, alertText, alertType, setOpen }: IAlertMessage) {
    return (
        <Alert
            style={{
                display: !open ? 'none' : 'flex',
            }}
            severity={alertType}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            {alertText}
        </Alert>
    );
}
