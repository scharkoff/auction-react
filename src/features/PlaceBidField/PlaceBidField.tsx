import React from 'react';
import styles from './PlaceBidField.module.scss';
import { Button, TextField } from '@mui/material';
import { ILotData } from 'redux/slices/lots';

interface IPlaceBidField {
    lot: ILotData;
    currentUserBid: number;
    onSubmitNewBid: () => void;
    setCurrentUserBid: React.Dispatch<React.SetStateAction<number>>;
}

export function PlaceBidField({
    lot,
    currentUserBid,
    onSubmitNewBid,
    setCurrentUserBid,
}: IPlaceBidField) {
    return (
        <div className={styles.wrapper}>
            <TextField
                label="Повысить ставку"
                value={currentUserBid}
                onChange={(e) => setCurrentUserBid(+e.target.value)}
            />

            <Button
                disabled={
                    currentUserBid <= lot?.price ||
                    Boolean(lot?.winner_id) ||
                    Number.isNaN(currentUserBid)
                }
                onClick={() => onSubmitNewBid()}
                variant="contained"
                color="success"
                sx={{ marginLeft: 2 }}
            >
                Повысить
            </Button>
        </div>
    );
}
