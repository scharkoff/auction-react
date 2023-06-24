import React from 'react';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Profile.module.scss';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { ProfileTabs } from 'shared/ProfileTabs/ProfileTabs';

export function Profile() {
    const { data } = useSelector((state: RootState) => state.auth);

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.userInfo}>
                        <div className={styles.userInfoWrapper}>
                            <AccountCircleIcon style={{ fontSize: 140 }} />

                            <Typography variant="subtitle1" color="grey" marginTop={4}>
                                Логин: <strong>{data?.username}</strong>
                            </Typography>

                            <Typography variant="subtitle1" color="grey">
                                Почта: <strong>{data?.email}</strong>
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.panel}>
                        <ProfileTabs />
                    </div>
                </div>
            </Container>
        </div>
    );
}
