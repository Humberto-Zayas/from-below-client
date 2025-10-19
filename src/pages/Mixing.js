import { Container, Typography } from "@mui/material";
import Header from "../components/navbar";
import MixToggleGroup from "../components/MixToggleGroup";
import PlaybackControls from "../components/PlaybackControls";
import TrackSelector from "../components/TrackSelector";
import useAudioABTest from "../hooks/useAudioABTest";

const tracks = [
  {
    name: "no_way_out_test1",
    displayName: "No Way Out (Test 1)",
    before: "/audio/No_Way_Out_Rough.mp3",
    after: "/audio/No_Way_Out_Master.mp3",
  },
  {
    name: "no_way_out_test2",
    displayName: "No Way Out (Test 2)",
    before: "/audio/No_Way_Out_Rough.mp3",
    after: "/audio/No_Way_Out_Master.mp3",
  },
];


export default function Mixing() {
  const {
    beforeRef,
    afterRef,
    currentTrack,
    currentVersion,
    isPlaying,
    progress,
    handleToggle,
    handlePlayPause,
    handleSeek,
    handleTrackChange,
  } = useAudioABTest(tracks);

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

        <TrackSelector
          tracks={tracks}
          currentTrack={currentTrack}
          onChange={handleTrackChange}
        />

        <MixToggleGroup current={currentVersion} onChange={handleToggle} />

        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          progress={progress}
          onSeek={handleSeek}
        />

        <audio ref={beforeRef} src={currentTrack.before} preload="auto" />
        <audio ref={afterRef} src={currentTrack.after} preload="auto" />
      </Container>
    </>
  );
}
