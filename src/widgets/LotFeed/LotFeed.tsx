import React from 'react';
import styles from './LotFeed.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { RootState, useAppDispatch } from 'redux/store';
import { LotCard } from 'widgets/LotCard/LotCard';
import { fetchGetAllLots } from 'redux/slices/lots';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlertMessage } from 'hooks';
import { AlertMessage } from 'shared';

export function LotFeed() {
    const dispatch = useAppDispatch();

    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { id } = useParams();

    const lots = useSelector((state: RootState) => state.lots.data);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchGetAllLots({ ownerId: 0, auctionId: Number.parseFloat(id) }));
        }
    }, [id]);

    return (
        <div className={styles.wrapper}>
            <AlertMessage {...alertVariables} />

            {lots.length ? (
                lots?.map((lot) => (
                    <LotCard lot={lot} key={lot?.id} setAlertOptions={setAlertOptions} />
                ))
            ) : (
                <div className={styles.empty}>
                    <span>В данном аукционе отсутствуют лоты...</span>
                    <SentimentVeryDissatisfiedIcon fontSize="medium" />
                </div>
            )}
        </div>
    );
}
