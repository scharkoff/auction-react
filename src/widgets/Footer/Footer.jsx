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
                        Developed by <span>Sharkoff</span>
                    </div>
                </div>
            </Container>
        </div>
    );
}
