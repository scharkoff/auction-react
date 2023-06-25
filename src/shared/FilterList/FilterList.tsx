import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface IFilterList {
    setFilterType: React.Dispatch<React.SetStateAction<string>>;
}

export function FilterList({ setFilterType }: IFilterList) {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="active"
                name="radio-buttons-group"
            >
                <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Активные"
                    onClick={() => setFilterType('active')}
                />
                <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Завершенные"
                    onClick={() => setFilterType('closed')}
                />
            </RadioGroup>
        </FormControl>
    );
}
