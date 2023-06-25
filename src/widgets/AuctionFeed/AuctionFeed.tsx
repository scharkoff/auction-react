import React from 'react';
import styles from './AuctionFeed.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { AuctionCard } from 'widgets';
import { IAuctionData } from 'redux/slices/auctions';
import { useAlertMessage } from 'hooks';
import { AlertMessage } from 'shared';

interface IAuctionFeed {
    auctions: IAuctionData[];
}

export function AuctionFeed({ auctions }: IAuctionFeed) {
    const [alertVariables, setAlertOptions] = useAlertMessage();

    return (
        <div className={styles.wrapper}>
            <AlertMessage {...alertVariables} />

            {auctions.length ? (
                auctions?.map((auction) => (
                    <AuctionCard
                        auction={auction}
                        key={auction?.id}
                        setAlertOptions={setAlertOptions}
                    />
                ))
            ) : (
                <div className={styles.empty}>
                    <span>В данный момент никакие аукционы не проходят...</span>
                    <SentimentVeryDissatisfiedIcon fontSize="medium" />
                </div>
            )}
        </div>
    );
}
