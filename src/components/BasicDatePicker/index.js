import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(props.value);
  // console.log('calendar day value: ', value.toISOString().split('T')[0])

  const getDisabledDates = (date) => {
    const blackoutDates = props.days.map((item) => item.date);
    return blackoutDates.includes(date.toISOString().split('T')[0]);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        maxDate={props.maxDate}
        shouldDisableDate={getDisabledDates}
        disablePast={true}
        value={value}
        onChange={(newValue) => {
          props.handleClick(newValue.toISOString().split('T')[0]);
          setValue(newValue)
        }}
        showToolbar={false}
      />
    </LocalizationProvider>
  );
}
