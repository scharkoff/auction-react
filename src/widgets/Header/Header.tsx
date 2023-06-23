import React from 'react';
import Container from '@mui/material/Container';
import styles from './Header.module.scss';
import Button from '@mui/material/Button';

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Header() {
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <Button variant="text" color="primary" size="large">
                            ONLINE AUCTION
                        </Button>
                    </div>

                    <ul className={styles.menu}>
                        <li className={styles.item}>
                            <Button variant="outlined" color="primary" size="medium">
                                Войти
                            </Button>
                        </li>
                        <li className={styles.item}>
                            <Button variant="contained" color="primary">
                                Регистрация
                            </Button>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}
