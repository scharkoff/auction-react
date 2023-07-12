import React from 'react';
import styles from './LotInfo.module.scss';
import { ILotData } from 'redux/slices/lot/types';

interface ILotInfo {
    lot: ILotData;
}

export function LotInfo({ lot }: ILotInfo) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Информация о лоте №{lot?.id}</div>

            <ul className={styles.list}>
                <li className={styles.item}>
                    <span>Название:</span> {lot?.title}
                </li>
                <li className={styles.item}>
                    <span>Описание:</span> {lot?.description}
                </li>
                <li className={styles.item}>
                    <span>Продавец:</span> {lot?.owner?.username}
                </li>
                <li className={styles.item}>
                    <span>Дата начала продажи:</span>{' '}
                    {lot?.start_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                </li>
                <li className={styles.item}>
                    <span>Дата окончания продажи:</span>{' '}
                    {lot?.end_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                </li>
                <li className={styles.item}>
                    <span>Победитель:</span> {lot?.winner_id ? lot.winner?.username : 'Не объявлен'}
                </li>
                <li className={styles.item}>
                    <span>{lot?.winner_id ? 'Окончательная цена:' : 'Минимальная ставка:'}</span>{' '}
                    <p className={styles.price}>{lot?.price} руб.</p>
                </li>
            </ul>
        </div>
    );
}
