import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { CalendarToday, ListAlt } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import fbslogo from "../images/fbs-red-logo.jpeg";
import AdminDateHours from "../components/AdminDateHours";
import AdminBookings from "../components/AdminBookings";
import Login from "../components/Login"; // Import the Login component
const adminPass = process.env.REACT_APP_ADMIN_PASSWORD;


const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("dateHours");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (password) => {
    // Replace "your-secret-password" with your actual admin password
    if (password === adminPass) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Save login state to localStorage
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const toggleComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <AppBar className="from-below-appbar" position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img style={{ width: "80px" }} src={fbslogo} alt="Logo" />
          <Typography
            variant="h5"
            component="h1"
            style={{
              color: "white",
              fontFamily: "Lato, sans-serif",
              fontWeight: 300,
              textTransform: "uppercase",
              margin: "0 auto",
            }}
          >
            Dashboard
          </Typography>
          {isLoggedIn && (
            <Button
              sx={{ width: "80px", color: "#00ffa2" }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        style={{ minHeight: "100vh", height: "auto", backgroundColor: "#f4f6f8" }}
        className="about"
        sx={{
          paddingLeft: "1em",
          paddingRight: "1em",
          paddingBottom: "6em",
          "@media (min-width: 768px)": {
            paddingLeft: "2em",
            paddingRight: "2em",
          },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            bottom: 0,
            height: 64,
            left: 0,
            zIndex: 999,
            borderTop: "1px solid #212121",
            "@media (min-width: 768px)": {
              width: 64,
              left: 0,
              paddingTop: 9,
              height: "100%",
              borderRight: "1px solid #212121",
            },
          }}
          className="side-drawer"
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "fit-content",
              margin: "0 auto",
              "@media (min-width: 768px)": {
                flexDirection: "column",
              },
            }}
          >
            <ListItem
              style={{ cursor: "pointer" }}
              onClick={() => toggleComponent("dateHours")}
            >
              <CalendarToday style={{ color: "white" }} />
            </ListItem>
            <ListItem
              style={{ cursor: "pointer" }}
              onClick={() => toggleComponent("bookings")}
            >
              <ListAlt style={{ color: "white" }} />
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Container maxWidth="md" style={{ paddingTop: "7em" }}>
          {isLoggedIn ? (
            <>
              {selectedComponent === "dateHours" && <AdminDateHours />}
              {selectedComponent === "bookings" && <AdminBookings />}
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Container>
      </Box>
    </>
  );
};

export default Admin;
