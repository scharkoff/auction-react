import React from 'react';
import styles from './AuctionFeed.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { AuctionCard } from 'widgets';
import { IAuctionData } from 'redux/slices/auction/types';
import { useAlertMessage } from 'hooks';
import { AlertMessage } from 'shared';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

interface IAuctionFeed {
    auctions: IAuctionData[];
}

export function AuctionFeed({ auctions }: IAuctionFeed) {
    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { loading } = useSelector((state: RootState) => state.auctions);

    return (
        <div className={styles.wrapper}>
            <AlertMessage {...alertVariables} />

            {loading ? (
                'Загрузка аукционов...'
            ) : (
                <>
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
                </>
            )}

            {}
        </div>
    );
}
