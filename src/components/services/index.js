import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Services() {
  return (
    <div className='section services' id="Services">
      <Container style={{textAlign: 'center'}} maxWidth="lg">
        <h3 className='heading-13'>SERVICES</h3>
        <p className='text-block-13'>
          From Below offers recording and audio mixing services. The studio is also available for production uses.
        </p>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid lg={6} md={12} sm={12} xs={12}>
              <Item>
                <h4 className='heading-17'>RECORDING <span className='text-span-20'>SERVICES</span></h4>
                <div style={{marginBottom: '2em'}} className="div-block-30"></div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    From Below records songs, mixtapes, EP's and
                    audiobooks for artists of multiple genres.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Industry quality recording booth, microphone and
                    outboard gear. Fits guitar, bass, keyboards and many
                    other instruments.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Plug and play your laptop and setup to our interface.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    <span>Acoustic treated booth, control room, and waiting
                      room with session live streamed on waiting room
                      monitor.</span>
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Comfortable and creative environment to work on your
                    project.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Access to your raw mix, tracks and project files upon
                    request.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Free backup. Studio keeps files backed up for use and
                    edit.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Multiple sessions, packages and recording blocks
                    available.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Private closed session (Each session is one on one
                    with the Engineer).
                  </p>
                </div>
              </Item>
            </Grid>
            <Grid lg={6} md={12} sm={12} xs={12}>
              <Item>
                <h4 className='heading-17'>MIXING <span className='text-span-20'>SERVICES</span></h4>
                <div style={{marginBottom: '2em'}} className="div-block-30"></div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    We offer full mix down available for your project
                    including albums, EP’s, mixtapes, podcasts,
                    instruments and more.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    We mix all genres/styles of music as well as various
                    job requests including podcast, audiobooks,
                    commercials and more.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Choose between 2 track mix for a quick reference or a
                    full track out mix down for a professional and dynamic
                    mix.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Includes up to 3 free revisions per song requested.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Creative effect processing with industry standard
                    plugins - Equalization, Compression and Dynamics,
                    Reverb, Delay.
                  </p>
                </div>
                <div className="div-block-57">
                  <div className="div-block-55">
                    <p className="service-icon"></p>
                  </div>
                  <p className="list-item-4">
                    Online mixing services available.
                  </p>
                  
                </div>
                <div className="div-block-57">
                    <div className="div-block-55">
                      <p className="service-icon"></p>
                    </div>
                    <p className="list-item-4">
                      Custom edits upon request - create performance ready
                      mixes, clip edits/fades/chops, looping and more.
                    </p>
                  </div>
              </Item>
            </Grid>

          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Services;