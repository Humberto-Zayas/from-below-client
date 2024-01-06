import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const possibleHours = ['02 Hours/$70', '04 Hours/$130', '08 Hours/$270', '10 Hours/$340', 'Full Day 14+ Hours/$550'];

export default function AdminSelectableHours(props) {
  const [checked, setChecked] = useState(possibleHours);
  const [checkedPulled, setCheckedPulled] = useState(['']);
  const [available, setAvailable] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch day data using the Fetch API
    fetch(`/api/day?date=${props.recordingDate.toISOString().split('T')[0]}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching day data:', error);
      });
  }, [props.recordingDate]);

  const hourOptionCheck = () => {
    if (data && data.day !== null) {
      const enabledObjects = data?.day?.hours.filter(obj => obj.enabled === true);
      const enabledNames = enabledObjects.map(obj => obj.hour);
      setCheckedPulled([...enabledNames]);
      callSetCheckedPulledHours();
    } else {
      props.handleSetCheckedHours(checked);
    }
  }

  const callSetCheckedPulledHours = () => {
    props.handleSetCheckedHours(checkedPulled);
  }

  const availabilityCheck = () => {
    if (data && data.day) {
      setAvailable(!data.day.disabled);
      props.updateAvailability(available);
    }
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.selectHours(event.target.innerText);
    props.handleSetCheckedHours(checked);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      newChecked.sort();
      props.handleSetCheckedHours(newChecked);
    } else {
      newChecked.splice(currentIndex, 1);
      newChecked.sort();
      props.handleSetCheckedHours(newChecked);
    }
    setChecked(newChecked);
  };

  const handleTogglePulled = (value) => () => {
    const currentIndex = checkedPulled.indexOf(value);
    const newChecked = [...checkedPulled];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedPulled(newChecked);
  };

  useEffect(() => {
    hourOptionCheck();
    availabilityCheck();
  }, [data]);

  return (
    <Box sx={{ width: '100%', maxWidth: 900, bgcolor: 'transparent' }}>
      <Switch defaultChecked={available} onChange={() => { setAvailable(!available) }} {...label} />
      {available ? <span style={{ color: '#e6e6e6', fontSize: '1.5em' }}>Available</span> : <span style={{ color: '#e6e6e6', fontSize: '1.5em' }}>Unavailable</span>}
      <Grid container spacing={2}>
        <Grid xs={6}>
          
            <List className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
              {data?.day.hours.map((item, index) => (
                <ListItemButton
                  disabled={!available}
                  key={item.hour}
                  selected={selectedIndex === index}
                >
                  <ListItemText style={{ color: '#bcbcbc' }} primary={item.hour} />
                  <Switch
                    edge="end"
                    onChange={handleTogglePulled(item.hour)}
                    checked={checkedPulled.indexOf(item.hour) !== -1}
                    inputProps={{
                      'aria-labelledby': item.hour,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
            :
            <List className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
              {possibleHours.map((item, index) => (
                <ListItemButton
                  disabled={!available}
                  key={item}
                >
                  <ListItemText style={{ color: '#bcbcbc' }} primary={item} />
                  <Switch
                    edge="end"
                    onChange={handleToggle(item)}
                    checked={checked.indexOf(item) !== -1}
                    inputProps={{
                      'aria-labelledby': item,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>

        </Grid>
        <Grid xs={6}>
          {data?.day !== null ?
            <p style={{ color: 'white', fontSize: '1.3em' }}>check pulled: <br></br>{checkedPulled}</p>
            :
            <p style={{ color: 'white', fontSize: '1.3em' }}>checked: <br></br>{checked}</p>
          }
        </Grid>
      </Grid>
    </Box>
  );
}
