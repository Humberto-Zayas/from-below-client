import Grid from '@mui/material/Unstable_Grid2';
import ImageCarousel from '../ImageCarousel';
import Container from '@mui/material/Container';
import Subfooter from '../../components/subfooter';
import studio1 from '../../images/_JP_6513.jpg';
import studio2 from '../../images/_JP_6442.jpg';
import studio3 from '../../images/_JP_6476.jpg';
import studio4 from '../../images/_JP_6496.jpg';
import studio5 from '../../images/_JP_6513.jpg';
import studio6 from '../../images/01-control-room-01.jpg';
import studio7 from '../../images/bg_pic1.jpg';
import studio8 from '../../images/mic-studio.jpg';

import gear1 from '../../images/03-avalon-01.jpg';
import gear2 from '../../images/06-outboard-01.jpg';
import gear3 from '../../images/08-mackie-01.jpg';
import gear4 from '../../images/10-uad-01.jpg';
import gear5 from '../../images/12-presonus-01.jpg';
import gear6 from '../../images/fabfilter-pro-q-2-equalizer-plug-in-tutorial.jpg';

const studioImages = [
	studio1,
	studio2,
	studio3,
  studio4,
  studio5,
  studio6,
  studio7,
  studio8
];

const gearImages = [
	gear1,
	gear2,
	gear3,
  gear4,
  gear5,
  gear6
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