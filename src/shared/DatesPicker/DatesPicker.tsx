import React from 'react';
import dayjs from 'dayjs';
import styles from './DatesPicker.module.scss';
import { Control, Controller } from 'react-hook-form';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IAuctionValues } from 'pages/AddNewAuction/AddNewAuction';
import { ILotValues } from 'pages/AddNewLot/AddNewLot';

interface IDatesPicker {
    control: Control<IAuctionValues | ILotValues, any>;
}

export function DatesPicker({ control }: IDatesPicker) {
    return (
        <div className={styles.dates}>
            <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            className={styles.field}
                            label="Время начала"
                            onChange={(value: Date | null) => {
                                if (value) {
                                    const startTimeInMillis = dayjs(value).valueOf();
                                    field.onChange(startTimeInMillis);
                                }
                            }}
                            value={field.value ? new Date(Number(field.value)) : null}
                        />
                    </LocalizationProvider>
                )}
            />

            <Controller
                control={control}
                name="endTime"
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            className={styles.field}
                            label="Время окончания"
                            onChange={(value: Date | null) => {
                                if (value) {
                                    const startTimeInMillis = dayjs(value).valueOf();
                                    field.onChange(startTimeInMillis);
                                }
                            }}
                            value={field.value ? new Date(Number(field.value)) : null}
                        />
                    </LocalizationProvider>
                )}
            />
        </div>
    );
}
