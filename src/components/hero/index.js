import * as React from 'react';
import Stack from '@mui/material/Stack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import GeneralContact from '../GeneralContact';
import HorizontalLinearStepper from '../stepper'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  height: '95%',
  border: 'none',
  overflow: 'scroll',
  p: 4,
};

function Hero() {
  const [open, setOpen] = React.useState(false);
  
  // Modal functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='section hero'>
      <h1 className='hero-h1 heading oswald'><span className='text-span'>FROM BELOW</span> <span className='text-span-2'>STUDIO</span></h1>
     
      <h2 className='heading-2 sub-cta'>New Jersey Recording Studio</h2>
      <p><a href="tel:+1-609-469-4340" className='link-3'>(609)-469-4340</a></p>
      <Stack spacing={2} direction="row">
        <span className='fbs-button' onClick={handleOpen} variant="contained"><CalendarMonthIcon style={{position: 'relative', top: '6px', left: '-9px'}} />BOOK YOUR SESSION</span>
      </Stack>

      <Modal
        sx={{overflow: 'scroll'}}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         
        <Fade in={open}>
          <Box className='div-block-42' sx={style}>
            <div style={{display: 'flex', justifyContent: 'end'}}>
              <CloseIcon style={{color: 'white'}} onClick={() => setOpen(false)} />
            </div>
            <HorizontalLinearStepper></HorizontalLinearStepper>
          </Box>
        </Fade>
        {/* <GeneralContact /> */}
      </Modal>
    </div>
  )

}

export default Hero;