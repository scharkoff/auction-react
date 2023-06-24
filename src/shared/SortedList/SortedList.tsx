import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export function SortedList() {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="timeUp" control={<Radio />} label="По убыванию времени" />
                <FormControlLabel
                    value="timeDown"
                    control={<Radio />}
                    label="По возрастанию времени"
                />
            </RadioGroup>
        </FormControl>
    );
}
