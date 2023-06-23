import React from 'react';
import styles from './MainContainer.module.scss';
import Container from '@mui/material/Container';

export function MainContainer() {
    return (
        <div className={styles.wrapper}>
            <Container></Container>
        </div>
    );
}
