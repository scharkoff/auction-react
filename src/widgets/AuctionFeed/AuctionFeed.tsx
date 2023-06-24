import React from 'react';
import styles from './AuctionFeed.module.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { AuctionCard } from 'widgets';
import { fetchGetAllAuctions } from 'redux/slices/auctions';

export function AuctionFeed() {
    const dispatch = useAppDispatch();

    const auctions = useSelector((state: RootState) => state.auctions.data);

    React.useEffect(() => {
        dispatch(fetchGetAllAuctions({ ownerId: null }));
    }, []);

    return (
        <div className={styles.wrapper}>
            {Array.isArray(auctions) &&
                auctions?.map((auction) => <AuctionCard auction={auction} key={auction?.id} />)}
        </div>
    );
}
