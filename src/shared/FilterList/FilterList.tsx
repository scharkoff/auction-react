import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export function FilterList() {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="active" control={<Radio />} label="Активные" />
                <FormControlLabel value="closed" control={<Radio />} label="Завершенные" />
            </RadioGroup>
        </FormControl>
    );
}
