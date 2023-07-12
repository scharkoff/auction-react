import React from 'react';
import styles from './LotCardButtons.module.scss';
import DeleteIcon from '@mui/icons-material/Clear';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import { fetchDeleteLot } from 'redux/slices/lot/lot';
import { AlertColor, IconButton } from '@mui/material';
import { IRejectedResponse, IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { RootState, useAppDispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import { ILotData } from 'redux/slices/lot/types';

interface ILotCardButtons {
    lot: ILotData;
    setAlertOptions: (visability: boolean, type: AlertColor, text: string) => void;
}

export function LotCardButtons({ lot, setAlertOptions }: ILotCardButtons) {
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
        <>
            {user?.is_superuser || user?.id === lot?.owner_id ? (
                <div className={styles.editButtons}>
                    <IconButton onClick={() => onClickDelete(lot?.id)} color="error">
                        <DeleteIcon color="error" />
                    </IconButton>
                </div>
            ) : (
                ''
            )}
        </>
    );
}
