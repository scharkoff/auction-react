import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './UserLots.module.scss';
import { IUserData } from 'redux/slices/auth';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchGetAllLots } from 'redux/slices/lots';
import { useSelector } from 'react-redux';
import { SimpleTable } from 'shared/SimpleTable/SimpleTable';

interface IUserLots {
    user: IUserData;
}

export interface ILotsTableData {
    id: number;
    title: string;
}

function createData(id: number, title: string) {
    return { id, title };
}

export function UserLots({ user }: IUserLots) {
    const dispatch = useAppDispatch();

    const lots = useSelector((state: RootState) => state.lots.data);

    const [rows, setRows] = React.useState<ILotsTableData[]>([]);

    React.useEffect(() => {
        dispatch(fetchGetAllLots({ ownerId: user?.id, auctionId: 0 }));
    }, []);

    React.useEffect(() => {
        const newRows = lots.map((lot) => createData(lot?.id, lot?.title));
        setRows(newRows);
    }, [lots]);

    return (
        <div className={styles.lots}>
            <Typography variant="h6" color="black">
                Ваши лоты
            </Typography>

            <div className={styles.table}>
                <SimpleTable rows={rows} type="lot" />
            </div>
        </div>
    );
}
