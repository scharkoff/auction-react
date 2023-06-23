import React from 'react';
import { Footer, Header } from 'widgets';
import { MainContainer } from 'pages';

interface IApp {
    toggleDarkMode: () => void;
}

export function App({ toggleDarkMode }: IApp) {
    return (
        <>
            <Header />
            <MainContainer />
            <Footer />
        </>
    );
}
