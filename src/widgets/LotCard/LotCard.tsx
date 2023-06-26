import React from 'react';
import styles from './LotCard.module.scss';
import DeleteIcon from '@mui/icons-material/Clear';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import { Link } from 'react-router-dom';
import { ILotData, fetchDeleteLot } from 'redux/slices/lots';
import { RootState, useAppDispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import { IRejectedResponse, IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { AlertColor, IconButton } from '@mui/material';

interface ILotCard {
    lot: ILotData;
    setAlertOptions: (visability: boolean, type: AlertColor, text: string) => void;
}

export function LotCard({ lot, setAlertOptions }: ILotCard) {
    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.auth.data);

    const onClickDelete = async (id: number) => {
        if (
            // eslint-disable-next-line no-alert
            window.confirm(
                'Вы действительно хотите удалить данный аукцион? При удалении удалятся все лоты данного аукциона',
            )
        ) {
            const response = await dispatch(fetchDeleteLot({ id }));

            handleInternalOrServerError(
                response as unknown as IResponse | IRejectedResponse,
                setAlertOptions as TSetAlertOptions,
            );
        }
    };

    return (
        <div className={styles.card}>
            {user?.is_superuser || user?.id === lot?.owner_id ? (
                <div className={styles.editButtons}>
                    <IconButton onClick={() => onClickDelete(lot?.id)} color="error">
                        <DeleteIcon color="error" />
                    </IconButton>
                </div>
            ) : (
                ''
            )}

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
