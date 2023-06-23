import React from 'react';
import { Footer, Header, Login } from 'widgets';
import { Route, Routes } from 'react-router-dom';
import { Main } from 'pages';

interface IApp {
    toggleDarkMode: () => void;
}

export function App({ toggleDarkMode }: IApp) {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>

            <Footer />
        </>
    );
}
