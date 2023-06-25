import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface ISortedList {
    setSortType: React.Dispatch<React.SetStateAction<string>>;
}

export function SortedList({ setSortType }: ISortedList) {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="timeDown"
                name="radio-buttons-group"
            >
                <FormControlLabel
                    onClick={() => setSortType('desc')}
                    value="timeDown"
                    control={<Radio />}
                    label="По убыванию даты размещения"
                />

                <FormControlLabel
                    value="timeUp"
                    control={<Radio />}
                    label="По возрастанию даты размещения"
                    onClick={() => setSortType('asc')}
                />
            </RadioGroup>
        </FormControl>
    );
}
