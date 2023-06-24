import React from 'react';
import Container from '@mui/material/Container';
import styles from './Main.module.scss';
import { AuctionFeed } from 'widgets';

export function Main() {
    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.feed}>
                        <AuctionFeed />
                    </div>

                    <div className={styles.mainMenu}>Text</div>
                </div>
            </Container>
        </div>
    );
}
