import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export default function TrackSelector({ tracks, currentTrack, onChange }) {
  return (
    <ToggleButtonGroup
      value={currentTrack.name}
      exclusive
      onChange={(_, name) => {
        const track = tracks.find((t) => t.name === name);
        if (track) onChange(track);
      }}
      sx={{
        mt: 3,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 2,
        p: 0.5,
        boxShadow: 1,
      }}
    >
      {tracks.map((track) => (
        <ToggleButton
          key={track.name}
          value={track.name}
          sx={{
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: 500,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px !important",
            color:
              currentTrack.name === track.name
                ? "#fff"
                : "rgba(255,255,255,0.7)",
            backgroundColor:
              currentTrack.name === track.name ? "primary.main" : "transparent",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor:
                currentTrack.name === track.name
                  ? "primary.dark"
                  : "rgba(255,255,255,0.1)",
            },
          }}
        >
          {track.displayName || track.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
