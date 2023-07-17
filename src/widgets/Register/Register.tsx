import React from 'react';
import styles from './Register.module.scss';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import { useForm } from 'react-hook-form';
import { fetchLogin, fetchRegister, selectIsAuth } from 'redux/slices/auth/auth';
import { IRegisterValues } from 'redux/slices/auth/types';
import { Link, Navigate } from 'react-router-dom';
import { useAlertMessage } from 'hooks';
import { useAppDispatch } from 'redux/store';
import { AlertMessage } from 'shared';
import { IRejectedResponse, IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { useSelector } from 'react-redux';

export function Register() {
    const dispatch = useAppDispatch();

    const isAuth = useSelector(selectIsAuth);

    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { register, handleSubmit, formState } = useForm<IRegisterValues>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmitRegister = async (values: IRegisterValues) => {
        const response = await dispatch(fetchRegister(values));

        handleInternalOrServerError(
            response as unknown as IResponse | IRejectedResponse,
            setAlertOptions as TSetAlertOptions,
        );

        if (!('error' in response)) {
            await dispatch(fetchLogin({ username: values.username, password: values.password }));
        }
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <section className={styles.wrapper}>
            <Container>
                <AlertMessage {...alertVariables} />

                <div className={styles.registerForm}>
                    <Typography classes={{ root: styles.title }} variant="h5">
                        Регистрация
                    </Typography>
                    <div className={styles.avatar}>
                        <Avatar sx={{ width: 100, height: 100 }} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmitRegister)}>
                        <TextField
                            className={styles.field}
                            label="Логин"
                            fullWidth
                            {...register('username', {
                                required: 'Введите логин',
                                minLength: {
                                    value: 3,
                                    message: 'Логин должен содержать минимум 3 символа',
                                },
                            })}
                            helperText={formState.errors.username?.message}
                            error={Boolean(formState.errors.username?.message)}
                        />
                        <TextField
                            className={styles.field}
                            label="E-Mail"
                            fullWidth
                            {...register('email', {
                                required: 'Укажите почту',
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Неверный формат почты',
                                },
                            })}
                            helperText={formState.errors.email?.message}
                            error={Boolean(formState.errors.email?.message)}
                        />
                        <TextField
                            type="password"
                            className={styles.field}
                            label="Пароль"
                            fullWidth
                            {...register('password', {
                                required: 'Введите пароль',
                                minLength: {
                                    value: 5,
                                    message: 'Пароль должен содержать минимум 5 символов',
                                },
                            })}
                            helperText={formState.errors.password?.message}
                            error={Boolean(formState.errors.password?.message)}
                        />

                        <Button
                            disabled={!formState.isValid}
                            type="submit"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            Зарегистрироваться
                        </Button>

                        <div className={styles.haveAccount}>
                            Есть аккаунт?{' '}
                            <Link to="/login">
                                <span>Авторизоваться</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
}
