import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Grid,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Calendar = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabledDays, setDisabledDays] = useState([]);
  const [disabledHours, setDisabledHours] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDayChange = (event) => {
    setDisabledDays(
      event.target.checked
        ? [0, 6]
        : [],
    );
  };

  const handleHourChange = (event) => {
    setDisabledHours(
      event.target.checked
        ? [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23]
        : [],
    );
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <DatePicker
          disablePast
          openTo="date"
          views={["year", "month", "date"]}
          value={selectedDate}
          onChange={handleDateChange}
          shouldDisableDate={(date) =>
            disabledDays.includes(date.getUTCDay())
          }
        />
        <TimePicker
          value={selectedDate}
          onChange={handleDateChange}
          disablePast
          minutesStep={15}
          shouldDisableTime={(date) =>
            disabledHours.includes(date.getUTCHours())
          }
        />
      </Grid>
      <FormControlLabel
        control={
          <Checkbox
            checked={disabledDays.length > 0}
            onChange={handleDayChange}
            name="weekend"
          />
        }
        label="Disable weekends"
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
    </MuiPickersUtilsProvider>
  );
};

export default Calendar;
