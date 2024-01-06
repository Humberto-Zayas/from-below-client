import React, { useState } from 'react';
import { Howl, Howler } from 'howler';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const MusicPlayer = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = React.useState(0);


  const handlePlay = () => {
    if (!track) {
      setTrack(new Howl({
        src: ['/music/im-going-home.mp3']
      }));
    }


    setIsPlaying(true);
    track.play();
    console.log(track)
  }

  const handlePause = () => {
    setIsPlaying(false);
    track.pause();
    console.log(track.seek())
  }

  const handleStop = () => {
    setIsPlaying(false);
    track.stop();
  }

  const handleSeek = (seekValue) => {
    track.seek(seekValue);
  }

  const handleMute = () => {
    setMuted(!muted);
    track.mute(muted);
  }

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }, []);

  console.log(progress)

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={track?.seek()} />
      </Box>
      <input type="range" onChange={(e) => handleSeek(e.target.value)} />
      <button onClick={handleMute}>Mute</button>
    </div>
  )
}

export default MusicPlayer;