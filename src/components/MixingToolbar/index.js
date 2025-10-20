// components/MixingToolbar.js
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Container, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import fbslogo from "../../images/fbs-red-logo.jpeg";

export default function MixingToolbar() {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);

  const handleBack = () => window.history.back();
  const handleGoHome = () => navigate("/");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Calculate opacity: 0 at top, 0.85 at 300px scroll
      const newOpacity = Math.min(scrollY / 300, 1) * 0.85;
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: `rgba(0,0,0,${opacity})`,
        boxShadow: "inset 0 -1px 0 0 rgb(53 53 53 / 80%)",
        backdropFilter: "blur(6px)",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box
            component="img"
            src={fbslogo}
            alt="From Below Studio"
            sx={{ width: 100, borderRadius: 1, cursor: "pointer" }}
            onClick={handleGoHome}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
