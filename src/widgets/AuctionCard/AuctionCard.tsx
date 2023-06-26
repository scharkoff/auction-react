import React from 'react';
import styles from './AuctionCard.module.scss';
import GavelIcon from '@mui/icons-material/Gavel';
import DeleteIcon from '@mui/icons-material/Clear';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import { IAuctionData, fetchDeleteAuction } from 'redux/slices/auctions';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { AlertColor, IconButton } from '@mui/material';
import { IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';

interface IAuctionCard {
    auction: IAuctionData;
    setAlertOptions: (visability: boolean, type: AlertColor, text: string) => void;
}

export function AuctionCard({ auction, setAlertOptions }: IAuctionCard) {
    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.auth.data);

    const onClickDelete = async (id: number) => {
        if (
            // eslint-disable-next-line no-alert
            window.confirm(
                'Вы действительно хотите удалить данный аукцион? При удалении удалятся все лоты данного аукциона',
            )
        ) {
            const response = await dispatch(fetchDeleteAuction({ id }));

            handleInternalOrServerError(
                response as unknown as IResponse,
                setAlertOptions as TSetAlertOptions,
            );
        }
    };

    return (
        <div className={styles.card}>
            {user?.is_superuser || user?.id === auction?.owner_id ? (
                <div className={styles.editButtons}>
                    <IconButton onClick={() => onClickDelete(auction?.id)} color="error">
                        <DeleteIcon color="error" />
                    </IconButton>
                </div>
            ) : (
                ''
            )}

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
                        {auction?.start_time?.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.endTime}>
                        <strong>Окончание:</strong>{' '}
                        {auction?.end_time?.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                    <div className={styles.status}>
                        {auction?.is_closed ? (
                            <span className={styles.closed}>Закрыт</span>
                        ) : (
                            <span className={styles.active}>Активный</span>
                        )}
                    </div>
                </div>

                <div className={styles.bar}>
                    <div className={styles.author}>
                        <strong>Автор:</strong> {auction?.owner?.username}
                    </div>
                    <div className={styles.created}>
                        <strong>Создано:</strong>{' '}
                        {auction?.created?.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                    </div>
                </div>
            </div>
        </div>
    );
}
