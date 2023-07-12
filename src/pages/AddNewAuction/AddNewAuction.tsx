import React from 'react';
import styles from './AddNewAuction.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AlertMessage } from 'shared';
import { Controller, useForm } from 'react-hook-form';
import { useAlertMessage } from 'hooks';
import { useAppDispatch } from 'redux/store';
import { IRejectedResponse, IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { fetchCreateAuction } from 'redux/slices/auction/auction';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/slices/auth';
import { Navigate } from 'react-router-dom';

type TAuctionValues = {
    title: string;
    description: string;
    startTime: number;
    endTime: number;
};

export function AddNewAuction() {
    const dispatch = useAppDispatch();

    const isAuth = useSelector(selectIsAuth);

    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { register, handleSubmit, formState, control } = useForm<TAuctionValues>({
        defaultValues: {
            title: '',
            description: '',
            startTime: 0,
            endTime: 0,
        },
        mode: 'onChange',
    });

    const onSubmitAuctionForm = async (values: TAuctionValues) => {
        const response = await dispatch(fetchCreateAuction(values));

        handleInternalOrServerError(
            response as unknown as IResponse | IRejectedResponse,
            setAlertOptions as TSetAlertOptions,
        );
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

                        <div className={styles.dates}>
                            <Controller
                                control={control}
                                name="startTime"
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            className={styles.field}
                                            label="Время начала"
                                            onChange={(value: Date | null) => {
                                                if (value) {
                                                    const startTimeInMillis =
                                                        dayjs(value).valueOf();
                                                    field.onChange(startTimeInMillis);
                                                }
                                            }}
                                            value={
                                                field.value ? new Date(Number(field.value)) : null
                                            }
                                        />
                                    </LocalizationProvider>
                                )}
                            />

                            <Controller
                                control={control}
                                name="endTime"
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            className={styles.field}
                                            label="Время окончания"
                                            onChange={(value: Date | null) => {
                                                if (value) {
                                                    const startTimeInMillis =
                                                        dayjs(value).valueOf();
                                                    field.onChange(startTimeInMillis);
                                                }
                                            }}
                                            value={
                                                field.value ? new Date(Number(field.value)) : null
                                            }
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>

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
