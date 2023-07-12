import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './UserAuction.module.scss';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchGetAllAuctions } from 'redux/slices/auction/auction';
import { useSelector } from 'react-redux';
import { SimpleTable } from 'shared/SimpleTable/SimpleTable';
import { IUserData } from 'redux/slices/auth/types';

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

export function UserAuctions({ user }: IUserLots) {
    const dispatch = useAppDispatch();

    const auctions = useSelector((state: RootState) => state.auctions.data);

    const [rows, setRows] = React.useState<ILotsTableData[]>([]);

    React.useEffect(() => {
        dispatch(fetchGetAllAuctions({ ownerId: user?.id, sort: '', filter: '' }));
    }, []);

    React.useEffect(() => {
        const newRows = auctions.map((auction) => createData(auction?.id, auction?.title));
        setRows(newRows);
    }, [auctions]);

    return (
        <div className={styles.auctions}>
            <Typography variant="h6" color="black">
                Ваши аукционы
            </Typography>

            <div className={styles.table}>
                <SimpleTable rows={rows} type="auction" />
            </div>
        </div>
    );
}
