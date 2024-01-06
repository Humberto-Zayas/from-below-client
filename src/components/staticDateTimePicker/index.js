import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function StaticDatePickerDemo(props) {
  const [value, setValue] = React.useState(props.value);
  const [disabledHours, setDisabledHours] = useState([]);

  const getDisabledDates = (date) => {
    let blackoutDates = [
      "2023-01-27",
      "2023-01-28",
      "2023-01-31",
      "2023-02-01"
    ]
    return blackoutDates.includes(date.toISOString().split('T')[0]);
  }

  const handleHourChange = (event) => {
    setDisabledHours(
      event.target.checked
        ? [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23]
        : [],
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        disablePast
        shouldDisableDate={getDisabledDates}
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        
        shouldDisableTime={(date) =>
          disabledHours.includes(date)
        }
        onChange={(newValue) => {
          console.log('on change ran')
          props.handleClick(newValue);
          setValue(newValue)
        }}
        onAccept={() => console.log('on accept')}
      />
       <FormControlLabel
        control={
          <Checkbox
            checked={disabledHours.length > 0}
            onChange={handleHourChange}
            name="late-hours"
          />
        }
        label="Disable late hours (7pm-7am)"
      />

    </LocalizationProvider>
  );
}