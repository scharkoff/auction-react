import React from 'react';
import styles from './LotCard.module.scss';
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
                    <p className={styles.lot}>Лот №{lot?.id}</p>
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
                        <strong>Начало:</strong>{' '}
                        {lot?.start_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.endTime}>
                        <strong>Окончание:</strong>{' '}
                        {lot?.end_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.status}>
                        {lot?.winner_id ? (
                            <span className={styles.closed}>Победитель найден</span>
                        ) : (
                            <span className={styles.active}>Активный</span>
                        )}
                    </div>
                </div>

                <div className={styles.bar}>
                    <div className={styles.author}>
                        <strong>Продавец:</strong> {lot?.owner?.username}
                    </div>

                    <div className={styles.auctionId}>
                        <strong>Аукцион:</strong> {lot?.auction?.title}
                    </div>
                </div>
            </div>
        </div>
    );
}
