import React from 'react';
import styles from './PlaceBid.module.scss';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ILotData } from 'redux/slices/lots';
import { IBidData } from 'redux/slices/bid';

interface IPlaceBid {
    lot: ILotData;
    bid: IBidData;
    onSubmitNewBid: () => void;
    currentUserBid: number;
    setCurrentUserBid: React.Dispatch<React.SetStateAction<number>>;
}

export function PlaceBid({
    lot,
    bid,
    onSubmitNewBid,
    currentUserBid,
    setCurrentUserBid,
}: IPlaceBid) {
    return (
        <div className={styles.wrapper}>
            <Typography variant="h6" color="initial">
                Принять участие:
            </Typography>

            <div className={styles.content}>
                <div className={styles.stats}>
                    Минимально предложенная цена:{' '}
                    <span className={styles.bid}>{lot?.price} руб.</span>
                </div>

                <div className={styles.wrapper}>
                    <p>
                        Ваша последняя предложенная цена:{' '}
                        <span className={styles.bid}>{bid?.price} руб.</span>
                    </p>

                    <div className={styles.panel}>
                        <TextField
                            label="Повысить ставку"
                            value={currentUserBid}
                            onChange={(e) => setCurrentUserBid(+e.target.value)}
                        />

                        <Button
                            disabled={currentUserBid <= lot?.price}
                            onClick={() => onSubmitNewBid()}
                            variant="contained"
                            color="success"
                            sx={{ marginLeft: 2 }}
                        >
                            Повысить
                        </Button>
                    </div>

                    {currentUserBid <= lot?.price && (
                        <p className={styles.warn}>
                            Ставка не может быть меньше или равной текущей
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
