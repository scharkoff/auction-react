import React from 'react';
import styles from './LotFeed.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { RootState, useAppDispatch } from 'redux/store';
import { LotCard } from 'widgets/LotCard/LotCard';
import { fetchGetAllLots, lotActions } from 'redux/slices/lots';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function LotFeed() {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const lots = useSelector((state: RootState) => state.lots.data);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchGetAllLots({ ownerId: 0, auctionId: Number.parseFloat(id) }));
        }

        return () => {
            dispatch(lotActions.cleanStateData());
        };
    }, [id]);

    return (
        <div className={styles.wrapper}>
            {lots.length ? (
                lots?.map((lot) => <LotCard lot={lot} key={lot?.id} />)
            ) : (
                <div className={styles.empty}>
                    <span>В данном аукционе отсутсвуют лоты...</span>
                    <SentimentVeryDissatisfiedIcon fontSize="medium" />
                </div>
            )}
        </div>
    );
}
