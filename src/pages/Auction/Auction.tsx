import React from 'react';
import Container from '@mui/material/Container';
import styles from './Auction.module.scss';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { LotFeed } from 'widgets';
import { RootState, useAppDispatch } from 'redux/store';
import { auctionActions, fetchAuctionGetById } from 'redux/slices/auctions';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Timer } from 'shared';
import Button from '@mui/material/Button';
import { selectIsAuth } from 'redux/slices/auth';

export function Auction() {
    const dispatch = useAppDispatch();

    const isAuth = useSelector(selectIsAuth);

    const { id } = useParams();

    const { currentAuctionData } = useSelector((state: RootState) => state.auctions);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchAuctionGetById({ id }));
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <Container>
                <Typography variant="h2" color="black" fontSize={36}>
                    Аукцион <strong>&#171;{currentAuctionData?.title}&#187;</strong>
                </Typography>

                <div className={styles.content}>
                    <div className={styles.feed}>
                        <LotFeed />
                    </div>

                    <div className={styles.menu}>
                        <div className={styles.item}>
                            <Typography variant="h5" color="initial" marginBottom={2}>
                                До окончания аукциона:
                            </Typography>
                            <Timer
                                startTime={currentAuctionData?.start_time}
                                endTime={currentAuctionData?.end_time}
                            />
                        </div>

                        <div className={styles.item}>
                            <Typography variant="h5" color="initial" marginBottom={2}>
                                Добавить свой лот в аукцион:
                            </Typography>

                            {isAuth ? (
                                <Link to={`/add-new-lot/auction/${currentAuctionData?.id}`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddBoxIcon fontSize="small" />}
                                    >
                                        Добавить лот
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled
                                    startIcon={<AddBoxIcon fontSize="small" />}
                                >
                                    Добавить лот
                                </Button>
                            )}

                            {!isAuth && (
                                <p className={styles.needAuthText}>Необходимо авторизоваться</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
