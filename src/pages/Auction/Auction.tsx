import React from 'react';
import Container from '@mui/material/Container';
import styles from './Auction.module.scss';
import Typography from '@mui/material/Typography';
import { LotFeed } from 'widgets';
import { RootState, useAppDispatch } from 'redux/store';
import { auctionActions, fetchAuctionGetById } from 'redux/slices/auctions';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Timer } from 'shared';

export function Auction() {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const { currentAuctionData } = useSelector((state: RootState) => state.auctions);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchAuctionGetById({ id }));
        }

        return () => {
            dispatch(auctionActions.cleanAuctionData());
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <Container>
                <Typography variant="h2" color="black" fontSize={36}>
                    Аукцион &#171;{currentAuctionData?.title}&#187;
                </Typography>

                <div className={styles.content}>
                    <div className={styles.feed}>
                        <LotFeed />
                    </div>

                    <div className={styles.menu}>
                        <div className={styles.timer}>
                            <Typography variant="h5" color="initial" marginBottom={2}>
                                До окончания аукциона:
                            </Typography>
                            <Timer
                                startTime={currentAuctionData?.start_time}
                                endTime={currentAuctionData?.end_time}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
