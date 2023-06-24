import React from 'react';
import styles from './AuctionFeed.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { AuctionCard } from 'widgets';
import { IAuctionData } from 'redux/slices/auctions';

interface IAuctionFeed {
    auctions: IAuctionData[];
}

export function AuctionFeed({ auctions }: IAuctionFeed) {
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
