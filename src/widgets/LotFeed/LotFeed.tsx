import React from 'react';
import styles from './LotFeed.module.scss';
import { RootState, useAppDispatch } from 'redux/store';
import { LotCard } from 'widgets/LotCard/LotCard';
import { fetchGetAllLots } from 'redux/slices/lots';
import { useSelector } from 'react-redux';

export function LotFeed() {
    const dispatch = useAppDispatch();

    const lots = useSelector((state: RootState) => state.lots.data);

    React.useEffect(() => {
        dispatch(fetchGetAllLots({ ownerId: null }));
    }, []);

    return (
        <div className={styles.wrapper}>
            {Array.isArray(lots) && lots?.map((lot) => <LotCard lot={lot} key={lot?.id} />)}
        </div>
    );
}
