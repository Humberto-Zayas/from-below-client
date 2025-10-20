// pages/Mixing.js
import React from "react";
import { Container, Typography, List, Box } from "@mui/material";
import MixingToolbar from "../components/MixingToolbar";
import TrackItem from "../components/TrackItem";
import useAudioABTest from "../hooks/useAudioABTest";
import { tracks } from "../data/tracks"

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
      <MixingToolbar />
      <Box className="about" style={{ minHeight: "100vh", height: "auto", backgroundColor: "#f4f6f8" }}>
        <Container maxWidth="md" style={{ paddingTop: 80 }}>
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            textAlign="center"
            sx={{
              color: "#f5f5f5", // light gray / off-white for contrast
              textShadow: "0 1px 3px rgba(0,0,0,0.5)", // subtle shadow for legibility
            }}
          >
            Mastering Examples
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
      </Box>
    </>
  );
}
