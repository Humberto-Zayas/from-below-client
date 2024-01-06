import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Container from '@mui/material/Container';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicDatePicker from '../BasicDatePicker';
import AdminSelectableHours from '../adminSelectableHours';

const steps = ['Pick A Date', 'Pick Your Hours', 'Review'];

export default function AdminStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [value, setValue] = useState(null);
  const [hours, setHours] = useState(null);
  const [checkedHours, setCheckedHours] = useState();
  const [availablity, setAvailability] = useState(null);
  const [blackoutDays, setBlackoutDays] = useState([]);

  useEffect(() => {
    // Fetch blackout days from your API
    fetch('/api/blackoutDays')
      .then(response => response.json())
      .then(data => {
        setBlackoutDays(data);
      })
      .catch(error => {
        console.error('Error fetching blackout days:', error);
      });
  }, []);

  const handleDatePick = (selectedDate) => {
    setValue(selectedDate);
    setActiveStep(1);
  };

  const handleHoursPicked = (selectedHours) => {
    setHours(selectedHours);
    setActiveStep(2);
  };

  const handleSetCheckedHours = (checked) => {
    setCheckedHours(checked);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const updateAvailability = (value) => {
    setAvailability(value);
  };

  return (
    <Container>
      <Box sx={{ width: '100%', mt: 1 }}>
        <div>Stats: {checkedHours}</div>
        <br />
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel className='text-block-13'>{label}</StepLabel>
              </Step>
            );
          })}
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
                <BasicDatePicker
                  value={value}
                  days={blackoutDays}
                  handleClick={handleDatePick}
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{ mt: 1 }}>
                <AdminSelectableHours
                  updateAvailability={updateAvailability}
                  recordingDate={value}
                  selectHours={handleHoursPicked}
                  handleSetCheckedHours={handleSetCheckedHours}
                />
              </Box>
            )}
            {activeStep === 2 && (
              <Box>
                <h3>Review</h3>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <br />
                availablity: {availablity ? 'Available' : 'Unavailable'}
                <br />
                hours: {checkedHours}
              </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                style={{ color: 'white' }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
