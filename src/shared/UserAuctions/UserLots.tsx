import React from 'react';
import Typography from '@mui/material/Typography';
import { IUserData } from 'redux/slices/auth';
import { useAppDispatch } from 'redux/store';
import { fetchGetAllAuctions } from 'redux/slices/auctions';

interface IUserLots {
    user: IUserData;
}

export function UserAuctions({ user }: IUserLots) {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchGetAllAuctions({ ownerId: user?.id, sort: '', filter: '' }));
    }, []);

    return (
        <div>
            <Typography variant="h6" color="black">
                Ваши аукционы
            </Typography>
        </div>
    );
}
