import React from 'react';
import styles from './LotCard.module.scss';
import { ILotData } from 'redux/slices/lots';
import { AlertColor } from '@mui/material';
import { LotCardEntity } from 'entities';

interface ILotCard {
    lot: ILotData;
    setAlertOptions: (visability: boolean, type: AlertColor, text: string) => void;
}

export function LotCard({ lot, setAlertOptions }: ILotCard) {
    return <LotCardEntity lot={lot} setAlertOptions={setAlertOptions} />;
}
