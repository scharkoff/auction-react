import React from 'react';
import styles from './LotCard.module.scss';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Link } from 'react-router-dom';
import { ILotData } from 'redux/slices/lots';

interface ILotCard {
    lot: ILotData;
}

export function LotCard({ lot }: ILotCard) {
    return (
        <div className={styles.card}>
            <Link to={`/lot/${lot?.id}`}>
                <div className={styles.image}>
                    <PriceChangeIcon fontSize="large" />
                </div>
            </Link>

            <div className={styles.wrapper}>
                <Link to={`/lot/${lot?.id}`}>
                    <div className={styles.title}>{lot?.title}</div>
                </Link>

                <div className={styles.description}>
                    {lot?.description ? lot?.description : 'Описание отсутсвует'}
                </div>

                <div className={styles.bar}>
                    <div className={styles.startTime}>
                        Начало: {lot?.start_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.endTime}>
                        Конец: {lot?.end_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                </div>
            </div>
        </div>
    );
}
