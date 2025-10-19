import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function MixToggleGroup({ current, onChange }) {
  return (
    <ToggleButtonGroup
      value={current}
      exclusive
      onChange={onChange}
      aria-label="mix toggle"
      sx={{
        mt: 3,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 2,
        p: 0.5,
        boxShadow: 1,
      }}
    >
      {["before", "after"].map((type) => (
        <ToggleButton
          key={type}
          value={type}
          sx={{
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: 500,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px !important",
            color: current === type ? "#fff" : "rgba(255,255,255,0.7)",
            backgroundColor: current === type ? "primary.main" : "transparent",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor:
                current === type
                  ? "primary.dark"
                  : "rgba(255,255,255,0.1)",
            },
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
