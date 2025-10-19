import { Container, Typography } from "@mui/material";
import Header from "../components/navbar";
import MixToggleGroup from "../components/MixToggleGroup";
import PlaybackControls from "../components/PlaybackControls";
import useAudioABTest from "../hooks/useAudioABTest";

export default function Mixing() {
  const {
    beforeRef,
    afterRef,
    current,
    isPlaying,
    progress,
    handleToggle,
    handlePlayPause,
    handleSeek,
  } = useAudioABTest("/audio/No_Way_Out_Rough.mp3", "/audio/No_Way_Out_Master.mp3");

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Mixing / Mastering A/B Test
        </Typography>

        <MixToggleGroup current={current} onChange={handleToggle} />

        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          progress={progress}
          onSeek={handleSeek}
        />

        <audio ref={beforeRef} src="/audio/No_Way_Out_Rough.mp3" preload="auto" />
        <audio ref={afterRef} src="/audio/No_Way_Out_Master.mp3" preload="auto" />
      </Container>
    </>
  );
}
