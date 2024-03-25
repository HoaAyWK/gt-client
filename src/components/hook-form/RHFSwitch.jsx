import React from 'react';
import { FormControlLabel, FormControl, FormLabel, Switch } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const RHFRadioGroup = ({ name, id, label, items, ...other }) => {
    const { control } = useFormContext();
    return (
        <FormControl>
            <FormLabel id={id}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Switch
                      {...field}
                    />
                )}
            />
        </FormControl>
    )
};

export default RHFRadioGroup;
