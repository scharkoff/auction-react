import React from 'react';
import Container from '@mui/material/Container';
import styles from './Main.module.scss';
import { AuctionFeed } from 'widgets';
import Typography from '@mui/material/Typography';
import { FilterList, SearchField, SortedList } from 'shared';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchAuctionsBySearchQuery, fetchGetAllAuctions } from 'redux/slices/auctions';

export function Main() {
    const dispatch = useAppDispatch();

    const auctions = useSelector((state: RootState) => state.auctions.data);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortType, setSortType] = React.useState('desc');
    const [filterType, setFilterType] = React.useState('active');

    React.useEffect(() => {
        dispatch(fetchGetAllAuctions({ ownerId: null, sort: sortType, filter: filterType }));
    }, []);

    React.useEffect(() => {
        dispatch(fetchAuctionsBySearchQuery({ query: searchQuery }));
    }, [searchQuery]);

    React.useEffect(() => {
        if (sortType || filterType) {
            dispatch(fetchGetAllAuctions({ ownerId: null, sort: sortType, filter: filterType }));
        }
    }, [sortType, filterType]);

    return (
        <div className={styles.wrapper}>
            <Container>
                <Typography variant="h2" color="black" fontSize={36}>
                    Лента аукционов
                </Typography>

                <div className={styles.content}>
                    <div className={styles.feed}>
                        <AuctionFeed auctions={auctions} />
                    </div>

                    <div className={styles.menu}>
                        <div className={styles.item}>
                            <Typography
                                variant="subtitle1"
                                color="initial"
                                fontWeight="bold"
                                marginBottom={2}
                            >
                                Поиск по названию
                            </Typography>
                            <SearchField
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        </div>

                        <div className={styles.item}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="initial"
                                marginBottom={2}
                            >
                                Сортировки
                            </Typography>

                            <ul className={styles.sortList}>
                                <SortedList setSortType={setSortType} />
                            </ul>
                        </div>

                        <div className={styles.item}>
                            <Typography
                                variant="subtitle1"
                                color="initial"
                                fontWeight="bold"
                                marginBottom={2}
                            >
                                Фильтры
                            </Typography>

                            <ul className={styles.filterList}>
                                <FilterList setFilterType={setFilterType} />
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
