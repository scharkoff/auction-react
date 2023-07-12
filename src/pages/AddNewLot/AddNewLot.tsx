import React from 'react';
import styles from './AddNewLot.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AlertMessage } from 'shared';
import { Controller, useForm } from 'react-hook-form';
import { useAlertMessage } from 'hooks';
import { RootState, useAppDispatch } from 'redux/store';
import { ICreateLotResponse, IRejectedResponse, IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/slices/auth/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchCreateLot } from 'redux/slices/lot/lot';

type TLotValues = {
    auctionId: number;
    title: string;
    description: string;
    startTime: number;
    endTime: number;
};

export function AddNewLot() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isAuth = useSelector(selectIsAuth);

    const auction = useSelector((state: RootState) => state.auctions.currentAuctionData);

    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { register, handleSubmit, formState, control } = useForm<TLotValues>({
        defaultValues: {
            auctionId: auction?.id,
            title: '',
            description: '',
            startTime: 0,
            endTime: 0,
        },
        mode: 'onChange',
    });

    const onSubmitLotForm = async (values: TLotValues) => {
        const response = (await dispatch(fetchCreateLot(values))) as unknown as ICreateLotResponse;

        handleInternalOrServerError(
            response as unknown as IResponse | IRejectedResponse,
            setAlertOptions as TSetAlertOptions,
        );

        if (response?.payload?.data && !Array.isArray(response?.payload?.data)) {
            navigate(`/lot/${response?.payload?.data?.id}`);
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
                        Создание нового лота для аукциона{' '}
                        <strong>&#171;{auction?.title}&#187;</strong>
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmitLotForm)}>
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
