import React from 'react';
import Container from '@mui/material/Container';
import styles from './FullLost.module.scss';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchFinishLot, fetchGetLotById } from 'redux/slices/lots';
import { Link, useParams } from 'react-router-dom';
import { LotSlider, PlaceBid } from 'widgets';
import { LotTableParticipants, Timer } from 'shared';
import { selectIsAuth } from 'redux/slices/auth';
import IconButton from '@mui/material/IconButton';
import {
    fetchCreateBid,
    fetchGetAllBids,
    fetchGetUserBidByLotId,
    fetchUpdateBid,
} from 'redux/slices/bid';

export function FullLot() {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const isAuth = useSelector(selectIsAuth);
    const lot = useSelector((state: RootState) => state.lots.currentLotData);
    const bid = useSelector((state: RootState) => state.bid.currentBidData);
    const bids = useSelector((state: RootState) => state.bid.data);
    const user = useSelector((state: RootState) => state.auth.data);

    const [currentUserBid, setCurrentUserBid] = React.useState(0);

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

    const mockImages = [
        'https://ir.ozone.ru/s3/multimedia-g/wc1000/6124805284.jpg',
        'https://ir.ozone.ru/s3/multimedia-d/wc1000/6267495421.jpg',
        'https://ir.ozone.ru/s3/multimedia-e/wc1000/6267495422.jpg',
    ];

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.breadcrumbs}>
                    <Link to="/">
                        {' '}
                        <span>Главная</span> /{' '}
                    </Link>
                    <span>
                        <Link to={`/auction/${lot?.auction?.id}`}>{lot?.auction?.title}</Link>
                    </span>{' '}
                    / <span>{lot?.title}</span>
                </div>

                <div className={styles.content}>
                    <div className={styles.infoBlock}>
                        <div className={styles.info}>
                            <div className={styles.infoTitle}>Информация о лоте №{lot?.id}</div>

                            <ul className={styles.list}>
                                <li className={styles.item}>
                                    <span>Название:</span> {lot?.title}
                                </li>
                                <li className={styles.item}>
                                    <span>Описание:</span> {lot?.description}
                                </li>
                                <li className={styles.item}>
                                    <span>Продавец:</span> {lot?.owner?.username}
                                </li>
                                <li className={styles.item}>
                                    <span>Дата начала продажи:</span>{' '}
                                    {lot?.start_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                                </li>
                                <li className={styles.item}>
                                    <span>Дата окончания продажи:</span>{' '}
                                    {lot?.end_time.replace(/T(\d{2}:\d{2}:\d{2}).*/, ' $1')}
                                </li>
                                <li className={styles.item}>
                                    <span>Победитель:</span>{' '}
                                    {lot?.winner_id ? lot.winner?.username : 'Не объявлен'}
                                </li>
                                <li className={styles.item}>
                                    <span>
                                        {lot?.winner_id
                                            ? 'Окончательная цена:'
                                            : 'Минимальная ставка:'}
                                    </span>{' '}
                                    <p className={styles.minPrice}>{lot?.price} руб.</p>
                                </li>
                            </ul>
                        </div>
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
                                        disabled={Boolean(!bids.length) || Boolean(lot?.winner_id)}
                                        onClick={() => onSubmitFinish()}
                                    >
                                        Завершить продажу
                                    </Button>

                                    {!bids.length ? (
                                        <p className={styles.warn}>
                                            Нельзя завершить аукцион досрочно без единой ставки
                                        </p>
                                    ) : (
                                        <>
                                            {lot?.winner_id ? (
                                                <p className={styles.warn}>Лот закрыт</p>
                                            ) : (
                                                ''
                                            )}
                                        </>
                                    )}
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
