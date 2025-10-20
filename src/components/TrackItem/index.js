// components/TrackItem.js
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
                backgroundColor: "primary.main",
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
