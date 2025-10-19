import { Box, Button, LinearProgress } from "@mui/material";

export default function PlaybackControls({ isPlaying, onPlayPause, progress, onSeek }) {
  return (
    <Box sx={{ mt: 4, width: "100%" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={onPlayPause}
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

      <Box
        sx={{
          mt: 3,
          cursor: "pointer",
          width: "100%",
        }}
        onClick={onSeek}
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
  );
}
