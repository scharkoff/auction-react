import React from 'react';
import styles from './AddNewAuction.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AlertMessage } from 'shared';
import { useForm } from 'react-hook-form';
import { useAlertMessage } from 'hooks';
import { useAppDispatch } from 'redux/store';
import handleInternalOrServerError from 'utils/functions/errors/handleInternalOrServerError';
import { IResponse } from 'utils/types';
import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { fetchCreateAuction } from 'redux/slices/auctions';
import Button from '@mui/material/Button';

type TAuctionValues = {
    title: string;
    description: string;
    startTime: number;
    endTime: number;
};

export function AddNewAuction() {
    const dispatch = useAppDispatch();

    const [alertVariables, setAlertOptions] = useAlertMessage();

    const { register, handleSubmit, formState } = useForm<TAuctionValues>({
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
            response as unknown as IResponse,
            setAlertOptions as TSetAlertOptions,
        );
    };

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
                                    value: 10,
                                    message: 'Длина описания не должна быть менее 10-ти символов!',
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

                        <TextField
                            className={styles.field}
                            label="Время начала"
                            error={Boolean(formState.errors.startTime?.message)}
                            helperText={formState.errors.startTime?.message}
                            {...register('startTime', {
                                required: 'Введите время начала',
                            })}
                            fullWidth
                        />

                        <TextField
                            className={styles.field}
                            label="Время окончания"
                            error={Boolean(formState.errors.endTime?.message)}
                            helperText={formState.errors.endTime?.message}
                            {...register('endTime', {
                                required: 'Введите время окончания',
                            })}
                            fullWidth
                        />

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
