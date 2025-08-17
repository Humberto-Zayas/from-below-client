import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
const api = process.env.REACT_APP_API_URL;

export default function SelectableHours(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [enabledData, setEnabledData] = useState([]);

  useEffect(() => {
    fetch(`${api}/days/days/${props.recordingDate}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.date && data.hours) {
          const enabledHours = data.hours.filter(item => item.enabled);
          setEnabledData(enabledHours);
        } else {
          setEnabledData([]);
        }
      })
      .catch(error => {
        console.error('Error fetching day data:', error);
      });
  }, [props.recordingDate]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.selectHours(event.target.innerText);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List style={{width: '100%'}} className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
        {enabledData.map((item, index) => (
          <ListItemButton 
            key={item.hour}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemText style={{color: '#bcbcbc'}} primary={item.hour} />  
          </ListItemButton>
        ))}
        {enabledData.length === 0 && (
          <>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemText style={{color: '#bcbcbc'}} primary="2 Hours/$100" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemText style={{color: '#bcbcbc'}} primary="3 Hours/$150" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText style={{color: '#bcbcbc'}} primary="4 Hours/$190" />
            </ListItemButton>
             <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText style={{color: '#bcbcbc'}} primary="6 Hours/$290" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemText style={{color: '#bcbcbc'}} primary="8 Hours/$390" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemText style={{color: '#bcbcbc'}} primary="10 Hours/$490" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemText style={{color: '#bcbcbc'}} primary="Full Day 14+ Hours/$550" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );
}
