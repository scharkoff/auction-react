import React from 'react';
import Typography from '@mui/material/Typography';
import { IUserData } from 'redux/slices/auth';
import { RootState, useAppDispatch } from 'redux/store';
import { fetchGetAllAuctions } from 'redux/slices/auctions';
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
        <div>
            <Typography variant="h6" color="black">
                Ваши аукционы
            </Typography>

            <SimpleTable rows={rows} type="auction" />
        </div>
    );
}
