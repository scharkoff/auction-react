import React from 'react';
import Typography from '@mui/material/Typography';
import { IUserData } from 'redux/slices/auth';
import { useAppDispatch } from 'redux/store';
import { fetchGetAllLots } from 'redux/slices/lots';

interface IUserLots {
    user: IUserData;
}

export function UserLots({ user }: IUserLots) {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchGetAllLots({ ownerId: user?.id, auctionId: 0 }));
    }, []);

    return (
        <div>
            <Typography variant="h6" color="black">
                Ваши лоты
            </Typography>
        </div>
    );
}
