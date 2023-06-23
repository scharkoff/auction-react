import { AlertColor } from '@mui/material';
import React from 'react';
import { IAlertMessage } from 'shared/AlertMessage';

export type TSetAlertOptions = (visability: boolean, type: AlertColor, text: string) => void;

export const useAlertMessage = (): [
    IAlertMessage,
    (visability: boolean, type: AlertColor, text: string) => void,
] => {
    const [open, setOpen] = React.useState(false);
    const [alertText, setAlertText] = React.useState('Непредвиденные обстоятельства');
    const [alertType, setAlertType] = React.useState<AlertColor>('info');

    const setAlertOptions = (visability: boolean, type: AlertColor, text: string) => {
        setOpen(visability);
        setAlertText(text);
        setAlertType(type);
    };

    return [{ open, alertText, alertType, setOpen }, setAlertOptions];
};

export default useAlertMessage;
