import Grid from '@mui/material/Unstable_Grid2';
import ImageCarousel from '../ImageCarousel';
import Container from '@mui/material/Container';
import Subfooter from '../../components/subfooter';
import studio1 from '../../images/DSC08720.jpg';
import studio2 from '../../images/DSC08722.jpg';
import studio3 from '../../images/DSC08728.jpg';
import studio4 from '../../images/DSC08729.jpg';
import studio5 from '../../images/DSC08730.jpg';
import studio6 from '../../images/DSC08801.jpg';
import studio7 from '../../images/DSC08802.jpg';
import studio8 from '../../images/DSC08827.jpg';
import studio9 from '../../images/DSC08838.jpg';
import studio10 from '../../images/DSC08880.jpg';
import studio11 from '../../images/DSC08911.jpg';
import studio12 from '../../images/DSC08917.jpg';
import studio13 from '../../images/DSC08925.jpg';
import studio14 from '../../images/DSC08949.jpg';
import studio15 from '../../images/DSC08975.jpg';

import gear1 from '../../images/DSC08739.jpg';
import gear2 from '../../images/DSC08742.jpg';
import gear3 from '../../images/DSC08746.jpg';
import gear4 from '../../images/DSC08801.jpg';
import gear5 from '../../images/DSC08850.jpg';
import gear6 from '../../images/DSC08861.jpg';
import gear7 from '../../images/DSC08866.jpg';
import gear8 from '../../images/DSC08900.jpg';
import gear9 from '../../images/DSC08901.jpg';
import gear10 from '../../images/DSC08907.jpg';

const studioImages = [
	studio1,
	studio2,
	studio3,
  studio4,
  studio5,
  studio6,
  studio7,
  studio8,
  studio9,
  studio10
];

const gearImages = [
	gear1,
	gear2,
	gear3,
  gear4,
  gear5,
  gear6,
  gear7,
  gear8
];

export default function About() {
  return (
    <div className='about' id="About">
      <Container maxWidth="lg">
        <h3 className='heading-10-copy'>
          ABOUT FROM BELOW <span className="text-span-24">STUDIO</span>
        </h3>
        <p className='text-block-9'>
          From Below is a recording studio in Central New Jersey. Our goal is to provide our clients with a safe, creative and professional environment to create the ultimate sound experience. The studio features two professionally sound treated rooms including; a control room for mixing and a vocal booth for recording. We offer recording and mixing services for a wide range of genres, styles and commercial uses. The Engineer brings 10+ years of experience to the table with over 1,000 songs recorded and mixed. Available now for live recording sessions, full albums/projects, mixing, online mixing and listening sessions. View the studio and gear below.
        </p>
        <Grid container spacing={2}>
          <Grid style={{overflow: 'hidden', height: '400px'}} lg={6} md={12} sm={12} xs={12}>
            <ImageCarousel images={studioImages} title={'The Studio'}/>
          </Grid>
          <Grid style={{overflow: 'hidden', height: '400px'}} lg={6} md={12} sm={12} xs={12}>
            <ImageCarousel images={gearImages} title={'Outboard Gear & Plugins'}/>
          </Grid>
        </Grid>
        <div className="about-divider"></div>
        <Subfooter></Subfooter>
      </Container>
    </div>
  )
}