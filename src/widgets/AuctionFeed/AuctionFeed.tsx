import React from 'react';
import styles from './AuctionFeed.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
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
            {auctions.length ? (
                auctions?.map((auction) => <AuctionCard auction={auction} key={auction?.id} />)
            ) : (
                <div className={styles.empty}>
                    <span>В данный момент никакие аукционы не проходят...</span>
                    <SentimentVeryDissatisfiedIcon fontSize="medium" />
                </div>
            )}
        </div>
    );
}
