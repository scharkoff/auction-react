import React from 'react';
import { Header } from 'widgets';

interface IApp {
    toggleDarkMode: () => void;
}

export function App({ toggleDarkMode }: IApp) {
    return <Header />;
}
