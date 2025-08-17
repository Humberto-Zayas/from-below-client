import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ContactForm(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
    referral: '',
    howDidYouHear: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Pass the form data to the parent component
    props.formCapture({
      ...formData,
      [name]: value, // Update the changed field
      date: props.date,
      hours: props.hours
    });
  };

  const handlePhoneChange = (event) => {
    const { name, value } = event.target;

    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format as US phone number: 123-456-7890
    let formatted = digits;
    if (digits.length > 3 && digits.length <= 6) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3);
    } else if (digits.length > 6) {
      formatted = digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6, 10);
    }

    // Update state
    setFormData((prevData) => ({
      ...prevData,
      [name]: formatted,
    }));

    props.formCapture({
      ...formData,
      [name]: formatted,
      date: props.date,
      hours: props.hours,
    });
  };

  return (
    <>
      <form>
        <FormControl sx={{ mt: 3 }} fullWidth>
          <TextField
            name="name"
            sx={{
              mb: 3,
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              }
            }}
            id="outlined-basic"
            label="Enter Your Name"
            variant="outlined"
            onChange={(event) => handleChange(event)}
            required
          />

          <TextField
            name="email"
            sx={{
              mb: 3,
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
            }}
            id="outlined-basic"
            label="Enter Your Email"
            variant="outlined"
            onChange={(event) => handleChange(event)}
            required
          />

          <TextField
            name="phoneNumber"
            sx={{
              mb: 3,
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                display: "none",
              },
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
            id="outlined-basic"
            type="text"
            label="Enter Your Phone Number"
            variant="outlined"
            onChange={handlePhoneChange}
            value={formData.phoneNumber || ''}
            required
          />

          <TextField
            name="message"
            sx={{
              mb: 3,
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
            }}
            id="outlined-basic"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            onChange={(event) => handleChange(event)}
            required
          />

          <FormControl sx={{ mb: 5 }}>
            <InputLabel id="demo-simple-select-label">How did you hear about us?</InputLabel>
            <Select
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
              }}
              defaultValue=""
              name="howDidYouHear"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="How did you hear about us"
              onChange={handleChange}
              required
            >
              <MenuItem value={'Instagram'}>Instagram</MenuItem>
              <MenuItem value={'X'}>X</MenuItem>
              <MenuItem value={'Facebook'}>Facebook</MenuItem>
              <MenuItem value={'Referred/Recommended'}>Referred/Recommended</MenuItem>
              <MenuItem value={'Google Search'}>Google Search</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{
              mb: 3,
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
            }}
            id="outlined-basic"
            label="Date Chosen"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={props.date}
          />

          <TextField
            sx={{
              mb: 3,
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
            }}
            id="outlined-basic"
            label="hours"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={props.hours}
          />

        </FormControl>
        {/* <Box sx={{ mt: 3 }}>
        <Button variant="contained">Send</Button>
      </Box> */}
      </form>
    </>
  )
}