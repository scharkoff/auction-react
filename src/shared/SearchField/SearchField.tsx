import * as React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

interface ISearchField {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchField({ searchQuery, setSearchQuery }: ISearchField) {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <TextField
            onChange={(e) => setSearchQuery(e.target.value)}
            id="outlined-basic"
            label="Поиск"
            variant="outlined"
            fullWidth
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            value={searchQuery}
            InputProps={{
                endAdornment: <SearchIcon color={isFocused ? 'primary' : 'inherit'} />,
            }}
        />
    );
}
