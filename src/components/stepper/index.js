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
import { sendEmail } from '../../utils/emailService';

const steps = ['Pick A Date', 'Pick Your Hours', 'Enter Your Information'];
const api = process.env.REACT_APP_API_URL;

export default function HorizontalLinearStepper({handleClose}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [value, setValue] = React.useState(dayjs().format('YYYY-MM-DD'));
  console.log('stepper value: ', value)
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

      const responseData = await response.json(); // Parse JSON response
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
        console.error('Error creating booking:', responseData.message || response.statusText);
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
    handleClose();
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
            From Below Studio has received your booking request. Please give us time to confirm availability for your session and that there are no scheduling conflicts on our end.
          </Typography>
          <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
            You will receive a confirmation email with your booking details and payment options for a deposit. In order to secure your session a 50% deposit will be required.
          </Typography>
          <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
             If you have any questions or concerns please reach out to frombelowstudio@gmail.com.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Close</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <Box sx={{ mt: 1 }}>
              <BasicDatePicker value={''} maxDate={maxDate} days={blackoutDays} handleClick={handleDatePick} />
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
