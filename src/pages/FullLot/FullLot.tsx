import React from 'react';
import Container from '@mui/material/Container';
import styles from './FullLost.module.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchLotById } from 'redux/slices/lots';
import { useParams } from 'react-router-dom';
import { LotSlider } from 'widgets';

export function FullLot() {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const lot = useSelector((state: RootState) => state.lots.currentLotData);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchLotById({ id: +id }));
        }
    }, []);

    const mockImages = [
        'https://ir.ozone.ru/s3/multimedia-g/wc1000/6124805284.jpg',
        'https://ir.ozone.ru/s3/multimedia-d/wc1000/6267495421.jpg',
        'https://ir.ozone.ru/s3/multimedia-e/wc1000/6267495422.jpg',
    ];

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.infoBlock}>
                        <div className={styles.info}>
                            <div className={styles.infoTitle}>Информация о лоте №{lot?.id}</div>

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
                                    <span>Победитель:</span>{' '}
                                    {lot?.winner_id ? lot.winner_id : 'Не объявлен'}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.imageBlock}>
                        <div className={styles.slider}>
                            <LotSlider images={mockImages} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
