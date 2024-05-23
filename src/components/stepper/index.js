import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import BasicDatePicker from '../BasicDatePicker';
import ContactForm from '../contactForm';
import SelectableHours from '../SelectableHours';

const steps = ['Pick A Date', 'Pick Your Hours', 'Enter Your Information'];
const api = process.env.REACT_APP_API_URL;

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [value, setValue] = React.useState(dayjs());
  const [maxDate, setMaxDate] = React.useState(null);
  const [hours, setHours] = React.useState(null);
  const [formState, setFormState] = React.useState({
    name: null,
    email: null,
    phoneNumber: null,
    message: null,
    date: null,
    howDidYouHear: null,
    hours: null
  });
  const [blackoutDays, setBlackoutDays] = React.useState([]);

  React.useEffect(() => {
    // Fetch blackout days from your API
    fetch(`${api}/days/blackoutDays`)
      .then(response => response.json())
      .then(data => {
        setBlackoutDays(data);
      })
      .catch(error => {
        console.error('Error fetching blackout days:', error);
      });
  }, []); // Run only once on component mount

  React.useEffect(() => {
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

  const handleDatePick = (value) => {
    setValue(value);
    setFormState({ ...formState, date: value });
    setActiveStep(1);
  };

  const handleHoursPicked = (value) => {
    setHours(value);
    // Extract the hour value from the selected hour string
    const selectedHour = value[0].split(" ")[0]; // Assuming value is an array with one element
    setFormState({ ...formState, hours: selectedHour });
    setActiveStep(2);
  };  

  const handleFormFinished = (formData) => {
    setFormState({ ...formState, ...formData }); // Merge the captured form data into the state
  };

  console.log('parent form state: ', formState);


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBookSession = async () => {
    try {
      // Perform the booking submission using the formState
      console.log("Booking submitted:", formState);

      // Prepare the booking data
      const bookingData = {
        name: formState.name,
        email: formState.email,
        phoneNumber: formState.phoneNumber,
        message: formState.message,
        howDidYouHear: formState.howDidYouHear,
        date: formState.date,
        hours: formState.hours,
      };

      // Make the API request to create the booking
      const response = await fetch(`${api}/bookings/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        // Reset the form state and move to the next step
        setFormState({
          name: null,
          email: null,
          phoneNumber: null,
          message: null,
          howDidYouHear: null,
          date: null,
          hours: null,
        });
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        console.log('Booking successfully created.');
      } else {
        console.error('Error creating booking:', response.statusText);
        alert('An error occurred while submitting the booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred while submitting the booking.');
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (formState.name && formState.email && formState.phoneNumber && formState.message && formState.howDidYouHear) {
      handleBookSession(); // Call the function to handle booking submission
    } else {
      alert('Please fill out all fields before submitting the form.');
    }
  };


  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel className='text-block-13'>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <Box sx={{ mt: 1 }}>
              <BasicDatePicker value={value} maxDate={maxDate} days={blackoutDays} handleClick={handleDatePick} />
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ mt: 1 }}>
              <SelectableHours recordingDate={value} selectHours={handleHoursPicked} />
            </Box>
          )}
          {activeStep === 2 && (
            <Box className='shtest' sx={{ mt: 1 }}>
              <ContactForm formCapture={handleFormFinished} date={value} hours={hours} />
            </Box>
          )}
          {activeStep === 3 && (
            <Box>
              <h3>Review</h3>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, color: 'white', opacity: activeStep === 0 ? 0 : 1 }}
              style={{ color: 'white' }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 && (
              <Button style={{ color: 'white' }} onClick={handleNext}>
                Book Session
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
