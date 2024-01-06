import * as React from 'react';
import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Timer from '../timer';
import MusicPlayer from '../MusicPlayer';

export default function BootlegStepper() {
  const effectRan = useRef(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const incrementStepper = () => {
    if (activeStep <= 4) {
      setTimeout(() => handleNext(), 3000);
    }
  }

  React.useEffect(() => {
    console.log('effect ran')

    //variation 2
    if (effectRan.current === true) {
      incrementStepper()
    }
    return () => {
      console.log('unmounted');
      effectRan.current = true;
    } //clean up function??? idk man...

    //variation 1 
    // if (effectRan.current === false) {
    //  incrementStepper()
    //  return () => {
    //   console.log('unmounted');
    //   effectRan.current = true;
    //   } //clean up function??? idk man...
    // }
  });

  return (
    <>
      <Timer time={60} />
      <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: '100%', flexGrow: 1, mt: 10 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      
      <MusicPlayer></MusicPlayer>
    </>

  );
}