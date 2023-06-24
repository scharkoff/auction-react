import React from 'react';
import styles from './AuctionCard.module.scss';
import GavelIcon from '@mui/icons-material/Gavel';
import { IAuctionData } from 'redux/slices/auctions';
import { Link } from 'react-router-dom';

interface IAuctionCard {
    auction: IAuctionData;
}

export function AuctionCard({ auction }: IAuctionCard) {
    return (
        <div className={styles.card}>
            <Link to={`/auction/${auction?.id}`}>
                <div className={styles.image}>
                    <GavelIcon fontSize="large" />
                </div>
            </Link>

            <div className={styles.wrapper}>
                <Link to={`/auction/${auction?.id}`}>
                    <div className={styles.title}>{auction?.title}</div>
                </Link>

                <div className={styles.description}>
                    {auction?.description ? auction?.description : 'Описание отсутсвует'}
                </div>

                <div className={styles.bar}>
                    <div className={styles.startTime}>
                        <strong>Начало:</strong>{' '}
                        {auction?.start_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.endTime}>
                        <strong>Окончание:</strong>{' '}
                        {auction?.end_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
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
