import React from 'react';
import styles from './AddNewAuction.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AlertMessage, DatesPicker } from 'shared';
import { Controller, useForm } from 'react-hook-form';
import { useAlertMessage } from 'hooks';
import { useAppDispatch } from 'redux/store';
import { IRejectedResponse, IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { fetchCreateAuction } from 'redux/slices/auction/auction';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/slices/auth/auth';
import { Navigate, useNavigate } from 'react-router-dom';

export interface IAuctionValues {
    title: string;
    description: string;
    startTime: number;
    endTime: number;
}

export function AddNewAuction() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isAuth = useSelector(selectIsAuth);

    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { register, handleSubmit, formState, control } = useForm<IAuctionValues>({
        defaultValues: {
            title: '',
            description: '',
            startTime: 0,
            endTime: 0,
        },
        mode: 'onChange',
    });

    const onSubmitAuctionForm = async (values: IAuctionValues) => {
        const response = await dispatch(fetchCreateAuction(values));

        handleInternalOrServerError(
            response as unknown as IResponse | IRejectedResponse,
            setAlertOptions as TSetAlertOptions,
        );

        if (!('error' in response)) {
            navigate(`/auction/${response?.payload?.data?.id}`);
        }
    };

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.wrapper}>
            <Container>
                <AlertMessage {...alertVariables} />

                <div className={styles.form}>
                    <Typography classes={{ root: styles.title }} variant="h5">
                        Создание нового аукциона
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmitAuctionForm)}>
                        <TextField
                            className={styles.field}
                            label="Название"
                            error={Boolean(formState.errors.title?.message)}
                            helperText={formState.errors.title?.message}
                            {...register('title', {
                                required: 'Введите название',
                                minLength: {
                                    value: 3,
                                    message: 'Длина названия не должна быть менее 3-х символов!',
                                },
                            })}
                            fullWidth
                        />
                        <TextField
                            className={styles.field}
                            label="Описание"
                            error={Boolean(formState.errors.description?.message)}
                            helperText={formState.errors.description?.message}
                            fullWidth
                            multiline
                            rows={10}
                            {...register('description', {
                                required: 'Напишите описание аукциона',
                                minLength: {
                                    value: 10,
                                    message: 'Длина описания не должна быть менее 10-ти символов!',
                                },
                            })}
                        />

                        <DatesPicker control={control} />

                        <div className={styles.buttonWrapper}>
                            <Button
                                className={styles.loginButton}
                                disabled={!formState.isValid}
                                type="submit"
                                size="large"
                                variant="contained"
                                fullWidth
                            >
                                Создать
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}
