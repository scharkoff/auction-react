import React from 'react';
import styles from './MainContainer.module.scss';
import Container from '@mui/material/Container';

interface IMainContainer {
    children: React.ReactNode;
}

export function MainContainer({ children }: IMainContainer) {
    return (
        <div className={styles.wrapper}>
            <Container>{children}</Container>
        </div>
    );
}
