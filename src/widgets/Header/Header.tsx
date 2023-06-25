import React from 'react';
import Container from '@mui/material/Container';
import styles from './Header.module.scss';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchLogout } from 'redux/slices/auth';

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Header() {
    const dispatch = useAppDispatch();

    const { authorization } = useSelector((state: RootState) => state.auth);
    const { data } = useSelector((state: RootState) => state.auth);
    const { username } = useSelector((state: RootState) => state.auth.data);

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
            dispatch(fetchLogout());
        }
    };

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <Link to="/">
                            <Button variant="text" color="primary" size="large">
                                ONLINE AUCTION
                            </Button>
                        </Link>
                    </div>

                    {authorization ? (
                        <ul className={styles.menu}>
                            <li className={styles.item}>
                                <Link to={`/profile/${data.id}`}>
                                    <Button variant="text" color="primary" size="medium">
                                        {username}
                                    </Button>
                                </Link>
                            </li>

                            <li className={styles.item}>
                                <Link to="/add-new-auction">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        startIcon={<AddBoxIcon fontSize="small" />}
                                    >
                                        Создать аукцион
                                    </Button>
                                </Link>
                            </li>

                            <li className={styles.item}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => onClickLogout()}
                                >
                                    Выйти
                                </Button>
                            </li>
                        </ul>
                    ) : (
                        <ul className={styles.menu}>
                            <li className={styles.item}>
                                <Link to="/login">
                                    <Button variant="outlined" color="primary" size="medium">
                                        Войти
                                    </Button>
                                </Link>
                            </li>

                            <li className={styles.item}>
                                <Link to="/register">
                                    <Button variant="contained" color="primary">
                                        Регистрация
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </Container>
        </div>
    );
}
