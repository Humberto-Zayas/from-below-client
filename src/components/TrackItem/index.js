import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

export default function TrackItem({
  track,
  handlePlayPause,
  handleToggleVersion,
  handleSeek,
}) {
  return (
    <Paper
      sx={{
        mb: 3,
        borderRadius: 3,
        p: 3,
        background: "linear-gradient(145deg, rgba(40,40,40,0.9), rgba(25,25,25,0.9))",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 14px rgba(0,0,0,0.6)",
        },
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
        <Typography
          variant="h6"
          sx={{
            color: "#f1f1f1",
            fontWeight: 600,
            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          {track.displayName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => handlePlayPause(track.id)}
            sx={{
              backgroundColor: track.isPlaying
                ? "primary.main"
                : "rgba(255,255,255,0.08)",
              color: track.isPlaying ? "#fff" : "#ccc",
              width: 50,
              height: 50,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#fff",
                boxShadow: "0 0 10px rgba(25,118,210,0.5)",
              },
              transition: "all 0.2s ease",
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
              border: "1px solid rgba(255,255,255,0.15)",
              "& .MuiToggleButton-root": {
                color: "#bbb",
                border: "none",
                fontWeight: 500,
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor: "rgba(25,118,210,0.3)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              },
            }}
          >
            <ToggleButton value="before">Before</ToggleButton>
            <ToggleButton value="after">After</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          onClick={(e) => handleSeek(track.id, e)}
          sx={{ cursor: "pointer" }}
        >
          <LinearProgress
            variant="determinate"
            value={track.progress}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": {
                background:
                  "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                boxShadow: "0 0 8px rgba(25,118,210,0.6)",
              },
            }}
          />
        </Box>

        <audio
          ref={(el) => (track.beforeRef = el)}
          src={track.before}
          preload="auto"
        />
        <audio
          ref={(el) => (track.afterRef = el)}
          src={track.after}
          preload="auto"
        />
      </ListItem>
    </Paper>
  );
}
