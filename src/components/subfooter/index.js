import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import visaLogo from '../../images/fbs-ccinfo.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '80vh',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Subfooter() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>

      <Grid container spacing={2}>
        <Grid lg={9} md={9} sm={12} xs={12}>
          <img style={{ width: '200px', marginBottom: '3em' }} src={visaLogo} />
        </Grid>
        <Grid lg={3} md={3} sm={12} xs={12}>
          <p style={{textAlign: 'center'}}><span className='misc-menu-item' onClick={handleOpen}>Studio Policy</span> <span className='misc-menu-item'>|</span> <span className='misc-menu-item'>Contact</span></p>

        </Grid>
      </Grid>

      <Modal
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
            <Typography style={{width: '100%', textAlign: 'center'}} className='policy-heading' id="transition-modal-title" component="h1">
              STUDIO POLICY
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              1. From Below Studio will provide studio time and the
              services of a recording engineer for the duration required
              by the Client. Any additional services, including, but not
              limited to recording, mixing, and adding to or modifying
              tracks when done outside the agreed upon time slot may
              require additional fees. The Client’s booking slot is
              forfeited upon cancellation of session.&nbsp;
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              2. From Below Studio is not responsible for lost, damaged, or stolen items that are left behind by a client.
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              3. In the event a piece of equipment owned by From Below Studio, or any part of its facility, becomes damaged by the Client or anyone in the Client’s party due to negligence, accident or willful act, the Client agrees to pay monetary compensation in the amount of full replacement value of the damaged item.
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              4. The Client agrees to allow its name, photographic image, and/or musical samples to be used on the Studio’s website and/or for other promotional purposes. From Below Studio will not sell or allow downloads of the client’s music without prior agreement.
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              5. If the From Below Studio must cancel a session due to illness, equipment malfunction, or other reasonable cause, From Below Studio will reschedule the session at the earliest available time agreed upon by both parties.
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              6. The Client releases From Below Studio from any harm or damage that may occur to any person in the Client’s party or to equipment belonging to the client.
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              7. The Client is responsible for obtaining all mechanical licenses for music that the Client does not own the rights. All such rights must be obtained prior to duplication or replication.
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              8. In the event any technical issues occur with From Below Studio’s equipment during a session, the clock will stop and the client will not be charged for the time it takes to fix the issue. 
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              9. Studio time includes setup time, break down time, and any breaks taken by the artist(s) or engineer. The engineer will be allowed a break of up to 15 minutes every 2 hours to alleviate ear fatigue. The Client will be allowed a 30 minute meal break during a session of more than 4 hours. This break will not be counted as time towards the session. 
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              10. From Below Studio will retain ownership of all master recordings and will not release them to the Client until all amounts owed under this Agreement are paid in full. 
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              11. This constitutes the entire agreement between the Client and From Below Studio, and may not be modified, changed, or terminated in any way unless there is a written agreement signed by both parties. 
            </Typography>
            <Typography className="policy-text" id="transition-modal-description" sx={{ mt: 2 }}>
              12. No drugs or controlled substances allowed in studio or on property. Violation of this will result in termination of the Client's session immediately.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}