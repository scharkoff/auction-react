import React from 'react';
import Container from '@mui/material/Container';
import styles from './Footer.module.scss';

export function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.title}>Online auction 2023</div>
                    <div>All rights reversed</div>
                    <div className={styles.developer}>
                        Developed by{' '}
                        <a href="https://github.com/scharkoff" target="_blank" rel="noreferrer">
                            Sharkoff
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
}
