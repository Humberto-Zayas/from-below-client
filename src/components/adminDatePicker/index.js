import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function AdminDatePicker(props) {
  const [value, setValue] = React.useState(props.value);

  const getDisabledDates = (date) => {
    let blackoutDates = [
      "2023-01-27",
      "2023-01-28",
      "2023-01-31",
      "2023-02-01"
    ]
    return blackoutDates.includes(date.toISOString().split('T')[0]);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast 
        shouldDisableDate={getDisabledDates}
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          console.log('on change ran')
          props.handleClick(newValue);
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}