import React from 'react';
import Container from '@mui/material/Container';
import styles from './Main.module.scss';
import { AuctionFeed } from 'widgets';
import Typography from '@mui/material/Typography';

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

                    <div className={styles.menu}>Text</div>
                </div>
            </Container>
        </div>
    );
}
