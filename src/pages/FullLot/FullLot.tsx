import React from 'react';
import Container from '@mui/material/Container';
import styles from './FullLot.module.scss';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchCheckLotStatus, fetchFinishLot, fetchGetLotById } from 'redux/slices/lot/lot';
import { Link, useParams } from 'react-router-dom';
import { LotSlider, PlaceBid } from 'widgets';
import { Breadcrumbs, LotInfo, LotTableParticipants, Timer } from 'shared';
import { selectIsAuth } from 'redux/slices/auth/auth';
import { mockImages } from './data/data';
import {
    fetchCreateBid,
    fetchGetAllBids,
    fetchGetUserBidByLotId,
    fetchUpdateBid,
} from 'redux/slices/bid/bid';

export function FullLot() {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const isAuth = useSelector(selectIsAuth);
    const lot = useSelector((state: RootState) => state.lots.currentLotData);
    const bid = useSelector((state: RootState) => state.bid.currentBidData);
    const bids = useSelector((state: RootState) => state.bid.data);
    const user = useSelector((state: RootState) => state.auth.data);

    const [currentUserBid, setCurrentUserBid] = React.useState(0);
    const [timesUp, setTimesUp] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchGetUserBidByLotId({ lotId: +id }));
            dispatch(fetchGetLotById({ id: +id }));
            dispatch(fetchGetAllBids({ lotId: +id }));
        }
    }, []);

    React.useEffect(() => {
        setCurrentUserBid(bid?.price);
    }, [bid]);

    React.useEffect(() => {
        if (timesUp) {
            dispatch(fetchCheckLotStatus({ id: lot?.id }));
        }
    }, [timesUp]);

    const onSubmitNewBid = async () => {
        if (bid?.id === 0) {
            await dispatch(fetchCreateBid({ lotId: lot?.id, price: currentUserBid }));
        } else {
            await dispatch(fetchUpdateBid({ bidId: bid?.id, price: currentUserBid }));
        }

        if (id) {
            dispatch(fetchGetLotById({ id: +id }));
            dispatch(fetchGetAllBids({ lotId: +id }));
        }
    };

    const onSubmitFinish = async () => {
        if (window.confirm('Вы действительно хотите завершить продажу досрочно?')) {
            await dispatch(fetchFinishLot({ id: lot?.id }));

            if (id) {
                dispatch(fetchGetLotById({ id: +id }));
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <Breadcrumbs lot={lot} />

                <div className={styles.content}>
                    <div className={styles.infoBlock}>
                        <LotInfo lot={lot} />
                    </div>

                    <div className={styles.imageBlock}>
                        <div className={styles.slider}>
                            <LotSlider images={mockImages} />
                        </div>
                    </div>
                </div>

                <div className={styles.bar}>
                    <Typography variant="h6" color="initial" marginBottom={2}>
                        До завершения осталось:
                    </Typography>
                    <div className={styles.timer}>
                        <Timer
                            setTimesUp={setTimesUp}
                            startTime={lot?.start_time}
                            endTime={lot?.end_time}
                            finished={Boolean(lot?.winner_id)}
                        />
                    </div>
                </div>

                <div className={styles.bar}>
                    {isAuth ? (
                        <>
                            {user?.id !== lot?.owner_id ? (
                                <PlaceBid
                                    lot={lot}
                                    bid={bid}
                                    onSubmitNewBid={onSubmitNewBid}
                                    currentUserBid={currentUserBid}
                                    setCurrentUserBid={setCurrentUserBid}
                                />
                            ) : (
                                <>
                                    <Typography variant="h6" color="initial" marginBottom={2}>
                                        Досрочное завершение продажи лота:
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            Boolean(!bids.length) ||
                                            Boolean(lot?.winner_id) ||
                                            Boolean(lot?.is_closed)
                                        }
                                        onClick={() => onSubmitFinish()}
                                    >
                                        Завершить продажу
                                    </Button>

                                    {!bids.length && !lot?.is_closed && (
                                        <p className={styles.warn}>
                                            Нельзя завершить аукцион досрочно без единой ставки
                                        </p>
                                    )}

                                    {lot?.is_closed && <p className={styles.warn}>Лот закрыт</p>}
                                </>
                            )}
                        </>
                    ) : (
                        <Typography variant="h6" color="initial">
                            Чтобы принять участие необходимо{' '}
                            <Link to="/login">
                                <span className={styles.needAuth}>авторизоваться</span>
                            </Link>
                        </Typography>
                    )}
                </div>

                <div className={styles.bar}>
                    <Typography variant="h6" color="initial">
                        Участники лота:
                    </Typography>

                    <div className={styles.users}>
                        <LotTableParticipants bids={bids} />
                    </div>
                </div>
            </Container>
        </div>
    );
}
