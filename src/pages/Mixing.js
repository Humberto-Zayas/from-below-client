// pages/Mixing.js
import React from "react";
import { Container, Typography, List } from "@mui/material";
import Header from "../components/navbar";
import TrackItem from "../components/TrackItem";
import useAudioABTest from "../hooks/useAudioABTest";

const tracks = [
  {
    id: 1,
    name: "no_way_out_test1",
    displayName: "No Way Out (Test 1)",
    before: "/audio/No_Way_Out_Rough.mp3",
    after: "/audio/No_Way_Out_Master.mp3",
  },
  {
    id: 2,
    name: "no_way_out_test2",
    displayName: "No Way Out (Test 2)",
    before: "/audio/No_Way_Out_Rough.mp3",
    after: "/audio/No_Way_Out_Master.mp3",
  },
];

export default function Mixing() {
  const {
    trackStates,
    setTrackStates,
    handlePlayPause,
    handleToggleVersion,
    handleSeek,
  } = useAudioABTest(tracks);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          textAlign="center"
        >
          Mixing / Mastering A/B Tests
        </Typography>

        <List>
          {trackStates.map((track) => (
            <TrackItem
              key={track.id}
              track={track}
              handlePlayPause={handlePlayPause}
              handleToggleVersion={handleToggleVersion}
              handleSeek={handleSeek}
            />
          ))}
        </List>
      </Container>
    </>
  );
}
