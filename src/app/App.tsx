import React from 'react';
import { Footer, Header, Login, Register } from 'widgets';
import { Route, Routes } from 'react-router-dom';
import { Main, Profile } from 'pages';
import { useAppDispatch } from 'redux/store';
import { fetchAuth } from 'redux/slices/auth';

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
            </Routes>

            <Footer />
        </>
    );
}
