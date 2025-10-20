import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
  Box,
  Paper,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import Header from "../components/navbar";

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
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [trackStates, setTrackStates] = useState(
    tracks.map((t) => ({
      ...t,
      version: "before",
      isPlaying: false,
      progress: 0,
      beforeRef: React.createRef(),
      afterRef: React.createRef(),
    }))
  );

// / Stop all other tracks when one starts playing
const stopAllExcept = (id) => {
  setTrackStates((prev) =>
    prev.map((t) => {
      if (t.id !== id) {
        // Pause both refs
        t.beforeRef.current?.pause();
        t.afterRef.current?.pause();
        return { ...t, isPlaying: false }; // ✅ make sure the UI reflects it
      }
      return t;
    })
  );
};

  // Handle A/B version switch
  const handleToggleVersion = (id, newValue) => {
    if (!newValue) return;

    setTrackStates((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const currentAudio =
            t.version === "before" ? t.beforeRef.current : t.afterRef.current;
          const nextAudio =
            newValue === "before" ? t.beforeRef.current : t.afterRef.current;
          nextAudio.currentTime = currentAudio.currentTime;
          if (t.isPlaying) {
            currentAudio.pause();
            nextAudio.play();
          }
          return { ...t, version: newValue };
        }
        return t;
      })
    );
  };

// Handle play/pause per track
const handlePlayPause = (id) => {
  setTrackStates((prev) => {
    // Determine if the clicked track is currently playing
    const clickedTrack = prev.find((t) => t.id === id);
    const isCurrentlyPlaying = clickedTrack?.isPlaying;
    const newStates = prev.map((t) => {
      const audio =
        t.version === "before" ? t.beforeRef.current : t.afterRef.current;

      if (t.id === id) {
        // Toggle this track
        if (isCurrentlyPlaying) {
          audio.pause();
          return { ...t, isPlaying: false };
        } else {
          // Pause all others first (sync UI immediately)
          prev.forEach((other) => {
            if (other.id !== id) {
              other.beforeRef.current?.pause();
              other.afterRef.current?.pause();
            }
          });
          audio.play();
          return { ...t, isPlaying: true };
        }
      } else {
        // All other tracks go to play state = false
        return { ...t, isPlaying: false };
      }
    });

    return newStates;
  });
};
  // Handle progress updates for each audio
  useEffect(() => {
    const intervals = trackStates.map((track) => {
      const audio =
        track.version === "before"
          ? track.beforeRef.current
          : track.afterRef.current;

      if (!audio) return null;

      const updateProgress = () => {
        setTrackStates((prev) =>
          prev.map((t) =>
            t.id === track.id
              ? {
                  ...t,
                  progress:
                    audio.duration > 0
                      ? (audio.currentTime / audio.duration) * 100
                      : 0,
                }
              : t
          )
        );
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", () =>
        setTrackStates((prev) =>
          prev.map((t) =>
            t.id === track.id ? { ...t, isPlaying: false, progress: 0 } : t
          )
        )
      );

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    });

    return () => intervals.forEach((cleanup) => cleanup && cleanup());
  }, [trackStates]);

  // Handle seeking on progress bar click
  const handleSeek = (id, e) => {
    const track = trackStates.find((t) => t.id === id);
    const audio =
      track.version === "before"
        ? track.beforeRef.current
        : track.afterRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom textAlign="center">
          Mixing / Mastering A/B Tests
        </Typography>

        <List>
          {trackStates.map((track) => (
            <Paper
              key={track.id}
              sx={{
                mb: 3,
                borderRadius: 2,
                p: 2,
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 2,
                }}
              >
                <ListItemText
                  primary={track.displayName}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => handlePlayPause(track.id)}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      "&:hover": { backgroundColor: "primary.main", color: "#fff" },
                    }}
                  >
                    {track.isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>

                  <ToggleButtonGroup
                    value={track.version}
                    exclusive
                    onChange={(_, v) => handleToggleVersion(track.id, v)}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <ToggleButton value="before">Before</ToggleButton>
                    <ToggleButton value="after">After</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Box onClick={(e) => handleSeek(track.id, e)}>
                  <LinearProgress
                    variant="determinate"
                    value={track.progress}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      cursor: "pointer",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  />
                </Box>

                <audio ref={track.beforeRef} src={track.before} preload="auto" />
                <audio ref={track.afterRef} src={track.after} preload="auto" />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Container>
    </>
  );
}
