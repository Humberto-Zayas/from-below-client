import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Grid, List, ListItem, ListItemText, Switch, TextField } from '@mui/material';
import './AdminDateHours.css';

const api = process.env.REACT_APP_API_URL;

const hourOptions = [
  { label: '2 Hours', price: '$70' },
  { label: '4 Hours', price: '$130' },
  { label: '8 Hours', price: '$270' },
  { label: '10 Hours', price: '$340' },
  { label: 'Full Day 14+ Hours', price: '$550' },
];

export default function AdminDateHours() {
  const [value, setValue] = useState(dayjs().format('YYYY-MM-DD')); // gets current day
  const [maxDate, setMaxDate] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dayData, setDayData] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false); // Toggle for multi-select mode
  const [selectedDates, setSelectedDates] = useState([]); // Array of selected dates
  const [disabledDatesList, setDisabledDatesList] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    console.log('value on useEffect: ', value)
    const apiUrl = `${api}/days/days/${value}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('get days/:date fetch: ', data)
        setDayData(data);
      })
      .catch((error) => {
        console.error("Error fetching day data:", error);
        setDayData(value);
      });
  }, [value]);

  useEffect(() => {
    const maxDateUrl = `${api}/days/getMaxDate`; // API endpoint to fetch max date
    fetch(maxDateUrl)
      .then((response) => response.json())
      .then((data) => {
        setMaxDate(data.maxDate);
      })
      .catch((error) => {
        console.error('Error fetching max date:', error);
      });
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (dayData && dayData.hours) {
      setSelectedOptions(
        hourOptions.map((opt) => ({
          ...opt,
          enabled: dayData.hours.some((hour) => hour.hour.includes(opt.label)),
        }))
      );
    } else {
      setSelectedOptions(hourOptions.map((opt) => ({ ...opt, enabled: false })));
    }
  }, [dayData]);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const response = await fetch(`${api}/days/blackoutDays`);
        const data = await response.json();

        // Filter only disabled days and extract date strings
        const disabledDateStrings = data
          .filter(day => day.disabled)
          .map(day => day.date); // Extract "2025-08-24" strings

        setDisabledDatesList(disabledDateStrings);
      } catch (error) {
        console.error('Error fetching blackout days:', error);
      }
    };

    fetchDisabledDates();
  }, [refreshTrigger]);

  const handleDatePick = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    if (multiSelect) {
      // Add or remove the selected date
      setSelectedDates((prev) =>
        prev.includes(formattedDate)
          ? prev.filter((date) => date !== formattedDate) // Remove if already selected
          : [...prev, formattedDate] // Add if not selected
      );
    } else {
      setValue(formattedDate); // Regular single date selection
    }
  };

  const handleOptionToggle = (option) => {
    if (!dayData) return;

    // Update the selected options locally
    const updatedOptions = selectedOptions.map((opt) =>
      opt.label === option.label ? { ...opt, enabled: !opt.enabled } : opt
    );
    setSelectedOptions(updatedOptions);

    // If multi-select is enabled, update hour blocks for all selected dates
    const selectedDatesToUpdate = multiSelect ? selectedDates : [value]; // Use selectedDates if multi-select is true

    // Create an array of API calls for each date
    const updatePromises = selectedDatesToUpdate.map((date) => {
      const apiUrl = `${api}/days/updateOrCreateDay`;

      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          selectedHours: updatedOptions
            .filter((opt) => opt.enabled)
            .map((opt) => ({
              hour: `${opt.label}/${opt.price}`,
              enabled: true,
            })),
        }),
      });
    });

    // Wait for all API calls to finish
    Promise.all(updatePromises)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((dataArray) => {
        console.log("Days created or updated:", dataArray);
      })
      .catch((error) => {
        console.error("Error creating or updating day:", error);
      });
  };

  const handleMaxDateChange = (newMaxDate) => {
    setMaxDate(newMaxDate);

    const apiUrl = `${api}/days/updateMaxDate`;
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxDate: newMaxDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Max date updated:', data);
      })
      .catch((error) => {
        console.error('Error updating max date:', error);
      });
  };

  const handleDisabledToggle = () => {
    if (!dayData) return;

    const newDisabled = !dayData.disabled;

    // Determine which dates to update
    const datesToUpdate = multiSelect ? selectedDates : [value];

    if (datesToUpdate.length === 0) return; // Avoid making unnecessary API calls

    // Make API calls for each selected date
    const disablePromises = datesToUpdate.map((date) => {
      const apiUrl = `${api}/days/editDay`;

      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          disabled: newDisabled,
        }),
      });
    });

    // Wait for all API calls to complete
    Promise.all(disablePromises)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((dataArray) => {
        console.log("Disabled state updated:", dataArray);
        setDayData(dataArray[0]); // Assuming all updates return the same format
        // ✅ After API calls succeed, bump refreshTrigger to refetch
        setRefreshTrigger((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error updating disabled state:", error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={7} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <List style={{ maxWidth: '310px', margin: '0 auto' }} component="nav">
            <ListItem>
              <ListItemText style={{ color: 'white' }} primary="Max Date" />
              <DatePicker
                disablePast={true}
                value={maxDate}
                renderInput={(params) => <TextField style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', width: '148px' }} {...params} />}
                onChange={handleMaxDateChange}
              />
            </ListItem>
            <ListItem>
              <ListItemText style={{ color: 'white' }} primary="Multi-Select" />
              <Switch
                checked={multiSelect}
                onChange={() => {
                  setMultiSelect((prev) => {
                    if (!prev) {
                      // Adding current selected date when enabling multi-select
                      setSelectedDates((prevDates) =>
                        prevDates.includes(value) ? prevDates : [...prevDates, value]
                      );
                    } else {
                      // Clearing selected dates when disabling multi-select
                      setSelectedDates([]);
                    }
                    return !prev;
                  });
                }}
              />
            </ListItem>
          </List>
          <StaticDatePicker
            maxDate={maxDate}
            disablePast={true}
            value={value}
            onChange={handleDatePick}
            showToolbar={false}
            renderDay={(day, _selectedDates, pickersDayProps) => {
              const formattedDay = day.format('YYYY-MM-DD');
              const isSelected = selectedDates.includes(formattedDay);
              const isDisabledVisually = disabledDatesList.includes(formattedDay);

              return (
                <PickersDay
                  {...pickersDayProps}
                  className={`
                    ${pickersDayProps.className}
                    ${isSelected ? 'Mui-selected' : ''}
                    ${isDisabledVisually ? 'visually-disabled-day' : ''}
                  `}
                />
              );
            }}

          />
        </LocalizationProvider>
      </Grid>
      <Grid item sm={5} xs={12}>
        <List component="nav">
          <ListItem>
            <ListItemText style={{ color: 'white' }} primary="Disabled" />
            <Switch
              checked={dayData ? dayData.disabled : true}
              onChange={handleDisabledToggle}
            />
          </ListItem>
          {selectedOptions.map((option, index) => (
            <ListItem
              key={index}
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                borderTop: index === 0 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                color: 'white',
              }}
            >
              <ListItemText style={{ color: 'white' }} primary={option.label} secondary={option.price} />
              <Switch
                size="small"
                checked={option.enabled}
                onChange={() => handleOptionToggle(option)}
                disabled={dayData && dayData.disabled} // Disable if the day is disabled
              />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText
              style={{ color: 'white' }}
              primary="Selected Dates"
              secondary={
                multiSelect
                  ? selectedDates.length > 0
                    ? selectedDates.join(', ')
                    : 'No dates selected'
                  : value
              }
            />
          </ListItem>

        </List>
      </Grid>
    </Grid>
  );
}
