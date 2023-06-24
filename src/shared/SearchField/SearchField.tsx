import * as React from 'react';
import TextField from '@mui/material/TextField';

interface ISearchField {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchField({ searchQuery, setSearchQuery }: ISearchField) {
    return (
        <TextField
            onChange={(e) => setSearchQuery(e.target.value)}
            id="outlined-basic"
            label="Поиск"
            variant="outlined"
            fullWidth
            value={searchQuery}
        />
    );
}
