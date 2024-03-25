import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, Select, InputLabel, MenuItem, ListItemText, Checkbox, FormHelperText } from '@mui/material';

const RHFTextField = ({ name, data, defaultValue, id, label, items, onItemsChange, ...other }) => {

  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            {...field}
            labelId={id}
            label={id}
            multiple
            onChange={(event) => {
              onItemsChange(event.target.value);
              field.onChange(event.target.value);
            }}
            value={items}
            error={!!error}
            defaultValue={defaultValue}
            {...other}
            renderValue={(selected) => {
              const values = [];
              selected.forEach(item => {
                const value = data.find(e => e.id === item);
                values.push(value?.name);
              });

              return values.join(', ');
            }}
          >
            {data.map((item) => (
              <MenuItem value={item?.id} key={item?.id}>
                <Checkbox checked={items.indexOf(item?.id) > -1} />
                <ListItemText primary={item?.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

RHFTextField.propTypes = {
    name: PropTypes.string,
};

export default RHFTextField;
