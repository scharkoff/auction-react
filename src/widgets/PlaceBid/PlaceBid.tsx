import React from 'react';
import styles from './PlaceBid.module.scss';
import Typography from '@mui/material/Typography';
import { ILotData } from 'redux/slices/lots';
import { IBidData } from 'redux/slices/bid/types';
import { PlaceBidField } from 'features';

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

                    <PlaceBidField
                        lot={lot}
                        currentUserBid={currentUserBid}
                        onSubmitNewBid={onSubmitNewBid}
                        setCurrentUserBid={setCurrentUserBid}
                    />

                    {currentUserBid <= lot?.price && !lot?.winner_id && (
                        <p className={styles.warn}>
                            Ставка не может быть меньше или равной текущей
                        </p>
                    )}

                    {lot?.winner_id && <p className={styles.warn}>Победитель уже определен</p>}

                    {Number.isNaN(currentUserBid) && !lot?.winner_id && (
                        <p className={styles.warn}>Значение должно быть числом</p>
                    )}
                </div>
            </div>
        </div>
    );
}
