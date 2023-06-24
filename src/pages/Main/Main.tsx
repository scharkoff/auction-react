import React from 'react';
import Container from '@mui/material/Container';
import styles from './Main.module.scss';
import { AuctionFeed } from 'widgets';
import Typography from '@mui/material/Typography';
import { FilterList, SearchField, SortedList } from 'shared';

export function Main() {
    return (
        <div className={styles.wrapper}>
            <Container>
                <Typography variant="h2" color="black" fontSize={36}>
                    Лента последних аукционов
                </Typography>

                <div className={styles.content}>
                    <div className={styles.feed}>
                        <AuctionFeed />
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
                            <SearchField />
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
                                <SortedList />
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
                                <FilterList />
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
