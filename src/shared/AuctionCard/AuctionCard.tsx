import React from 'react';
import styles from './AuctionCard.module.scss';
import GavelIcon from '@mui/icons-material/Gavel';
import { IAuctionData } from 'redux/slices/auctions';

interface IAuctionCard {
    auction: IAuctionData;
}

export function AuctionCard({ auction }: IAuctionCard) {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <GavelIcon fontSize="large" />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.title}>{auction?.title}</div>
                <div className={styles.description}>
                    {auction?.description ? auction?.description : 'Описание отсутсвует'}
                </div>
                <div className={styles.bar}>
                    <div className={styles.startTime}>
                        Начало: {auction?.start_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.endTime}>
                        Конец: {auction?.end_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.status}>
                        {auction?.is_closed ? (
                            <span className={styles.closed}>Закрыт</span>
                        ) : (
                            <span className={styles.active}>Активный</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
