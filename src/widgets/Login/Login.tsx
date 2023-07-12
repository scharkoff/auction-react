import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styles from './Login.module.scss';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { fetchLogin, selectIsAuth } from 'redux/slices/auth/auth';
import { useAppDispatch } from 'redux/store';
import { useAlertMessage } from 'hooks';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { AlertMessage } from 'shared';
import { IRejectedResponse, IResponse } from 'utils/types';
import { TLoginValues } from 'redux/slices/auth/types';

export function Login() {
    const dispatch = useAppDispatch();

    const isAuth = useSelector(selectIsAuth);

    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { register, handleSubmit, formState } = useForm<TLoginValues>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmitAuth = async (values: TLoginValues) => {
        const response = await dispatch(fetchLogin(values));

        handleInternalOrServerError(
            response as unknown as IResponse | IRejectedResponse,
            setAlertOptions as TSetAlertOptions,
        );
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.wrapper}>
            <Container>
                <AlertMessage {...alertVariables} />

                <div className={styles.loginForm}>
                    <Typography classes={{ root: styles.title }} variant="h5">
                        Авторизация
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmitAuth)}>
                        <TextField
                            className={styles.field}
                            label="Логин"
                            error={Boolean(formState.errors.username?.message)}
                            helperText={formState.errors.username?.message}
                            {...register('username', {
                                required: 'Введите логин',
                            })}
                            fullWidth
                        />
                        <TextField
                            className={styles.field}
                            type="password"
                            label="Пароль"
                            error={Boolean(formState.errors.password?.message)}
                            fullWidth
                            {...register('password', {
                                required: 'Введите пароль',
                                minLength: {
                                    value: 5,
                                    message: 'Пароль должен содержать минимум 5 символов',
                                },
                            })}
                            helperText={formState.errors.password?.message}
                        />
                        <Button
                            className={styles.loginButton}
                            disabled={!formState.isValid}
                            type="submit"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            Войти
                        </Button>

                        <div className={styles.haventAccount}>
                            Нет аккаунта?{' '}
                            <Link to="/register">
                                <span>Зарегистрироваться</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}
