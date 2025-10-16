import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import Header from "../components/navbar";

export default function Mixing() {
  const beforeRef = useRef(null);
  const afterRef = useRef(null);

  const [current, setCurrent] = useState("before");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleToggle = (_, newValue) => {
    if (!newValue) return;
    const currentAudio = current === "before" ? beforeRef.current : afterRef.current;
    const nextAudio = newValue === "before" ? beforeRef.current : afterRef.current;

    if (currentAudio && nextAudio) {
      const currentTime = currentAudio.currentTime;
      nextAudio.currentTime = currentTime;

      if (isPlaying) {
        nextAudio.play();
        currentAudio.pause();
      }
    }

    setCurrent(newValue);
  };

  const handlePlayPause = () => {
    const activeAudio = current === "before" ? beforeRef.current : afterRef.current;
    if (!activeAudio) return;

    if (isPlaying) {
      activeAudio.pause();
    } else {
      activeAudio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress as audio plays
  useEffect(() => {
    const activeAudio = current === "before" ? beforeRef.current : afterRef.current;
    if (!activeAudio) return;

    const updateProgress = () => {
      if (activeAudio.duration) {
        const value = (activeAudio.currentTime / activeAudio.duration) * 100;
        setProgress(value);
      }
    };

    activeAudio.addEventListener("timeupdate", updateProgress);
    activeAudio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      activeAudio.removeEventListener("timeupdate", updateProgress);
    };
  }, [current]);

  // Handle seeking when clicking progress bar
  const handleSeek = (e) => {
    const activeAudio = current === "before" ? beforeRef.current : afterRef.current;
    if (!activeAudio || !activeAudio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * activeAudio.duration;

    activeAudio.currentTime = newTime;
    setProgress((newTime / activeAudio.duration) * 100);
  };

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

        {/* Toggle Buttons */}
        <ToggleButtonGroup
          value={current}
          exclusive
          onChange={handleToggle}
          aria-label="mix toggle"
          sx={{
            mt: 3,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            p: 0.5,
            boxShadow: 1,
          }}
        >
          <ToggleButton
            value="before"
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px !important",
              color: current === "before" ? "#fff" : "rgba(255,255,255,0.7)",
              backgroundColor:
                current === "before" ? "primary.main" : "transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  current === "before"
                    ? "primary.dark"
                    : "rgba(255,255,255,0.1)",
              },
            }}
          >
            Before
          </ToggleButton>

          <ToggleButton
            value="after"
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px !important",
              color: current === "after" ? "#fff" : "rgba(255,255,255,0.7)",
              backgroundColor:
                current === "after" ? "primary.main" : "transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  current === "after"
                    ? "primary.dark"
                    : "rgba(255,255,255,0.1)",
              },
            }}
          >
            After
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Play/Pause Button + Progress Bar */}
        <Box sx={{ mt: 4, width: "100%" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePlayPause}
            sx={{
              px: 4,
              py: 1,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>

          {/* Interactive Progress Bar */}
          <Box
            sx={{
              mt: 3,
              cursor: "pointer",
              width: "100%",
            }}
            onClick={handleSeek}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "primary.main",
                },
              }}
            />
          </Box>
        </Box>

        {/* Hidden audio elements */}
        <audio ref={beforeRef} src="/audio/No_Way_Out_Rough.mp3" preload="auto" />
        <audio ref={afterRef} src="/audio/No_Way_Out_Master.mp3" preload="auto" />
      </Container>
    </>
  );
}
