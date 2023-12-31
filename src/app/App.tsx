import React from 'react';
import { Footer, Header, Login, Register } from 'widgets';
import { Route, Routes } from 'react-router-dom';
import { AddNewAuction, AddNewLot, Auction, FullLot, Main, Profile } from 'pages';
import { useAppDispatch } from 'redux/store';
import { fetchAuth } from 'redux/slices/auth/auth';

interface IApp {
    toggleDarkMode: () => void;
}

export function App({ toggleDarkMode }: IApp) {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchAuth());
    }, []);

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/profile/:id" element={<Profile />}></Route>
                <Route path="/auction/:id" element={<Auction />}></Route>
                <Route path="/add-new-auction/" element={<AddNewAuction />}></Route>
                <Route path="/add-new-lot/auction/:id" element={<AddNewLot />}></Route>
                <Route path="/lot/:id" element={<FullLot />}></Route>
            </Routes>

            <Footer />
        </>
    );
}
