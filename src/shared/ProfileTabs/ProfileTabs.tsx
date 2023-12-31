import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './ProfileTabs.module.scss';
import { UserLots } from '../UserLots/UserLots';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { UserAuctions } from 'shared/UserAuctions/UserLots';

export function ProfileTabs() {
    const [value, setValue] = React.useState('1');

    const user = useSelector((state: RootState) => state.auth.data);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={(e, newValue) => handleChange(e, newValue)}
                        aria-label="Profile tabs"
                    >
                        <Tab label="Лоты" value="1" />
                        <Tab label="Аукционы" value="2" />
                        {/* <Tab label="Ставки" value="3" /> */}
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <UserLots user={user} />
                </TabPanel>
                <TabPanel value="2">
                    <UserAuctions user={user} />
                </TabPanel>
                {/* <TabPanel value="3"></TabPanel> */}
            </TabContext>
        </Box>
    );
}
