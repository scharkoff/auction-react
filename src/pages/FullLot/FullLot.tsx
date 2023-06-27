import React from 'react';
import Container from '@mui/material/Container';
import styles from './FullLost.module.scss';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchGetLotById } from 'redux/slices/lots';
import { Link, useParams } from 'react-router-dom';
import { LotSlider } from 'widgets';
import { LotTableParticipants, Timer } from 'shared';
import { selectIsAuth } from 'redux/slices/auth';
import {
    fetchCreateBid,
    fetchGetAllBids,
    fetchGetUserBidByLotId,
    fetchUpdateBid,
} from 'redux/slices/bid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

    const mockImages = [
        'https://ir.ozone.ru/s3/multimedia-g/wc1000/6124805284.jpg',
        'https://ir.ozone.ru/s3/multimedia-d/wc1000/6267495421.jpg',
        'https://ir.ozone.ru/s3/multimedia-e/wc1000/6267495422.jpg',
    ];

    return (
        <div className={styles.wrapper}>
            <Container>
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
                                    {lot?.winner_id ? lot.winner_id : 'Не объявлен'}
                                </li>
                                <li className={styles.item}>
                                    <span>Минимальная ставка:</span>{' '}
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
                    <Typography variant="h6" color="initial">
                        До завершения осталось:
                    </Typography>
                    <div className={styles.timer}>
                        <Timer startTime={lot?.start_time} endTime={lot?.end_time} />
                    </div>
                </div>

                <div className={styles.bar}>
                    {isAuth ? (
                        <div className={styles.barWrapper}>
                            <Typography variant="h6" color="initial">
                                Принять участие:
                            </Typography>

                            <div className={styles.bidWrapper}>
                                <div className={styles.stats}>
                                    Минимально предложенная цена:{' '}
                                    <span className={styles.minPrice}>{lot?.price} руб.</span>
                                </div>

                                <div className={styles.takePart}>
                                    <p>
                                        {' '}
                                        Ваша последняя предложенная цена:{' '}
                                        <span className={styles.minPrice}>{bid?.price} руб.</span>
                                    </p>

                                    <div className={styles.priceUp}>
                                        <TextField
                                            label="Повысить ставку"
                                            value={currentUserBid}
                                            onChange={(e) => setCurrentUserBid(+e.target.value)}
                                        />

                                        <Button
                                            disabled={currentUserBid <= lot?.price}
                                            onClick={() => onSubmitNewBid()}
                                            variant="contained"
                                            color="success"
                                            sx={{ marginLeft: 2 }}
                                        >
                                            Повысить
                                        </Button>
                                    </div>

                                    {currentUserBid <= lot?.price && (
                                        <p className={styles.warn}>
                                            Ставка не может быть меньше или равной текущей
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
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
