import React, { useEffect, useState } from 'react';
import Header from '../components/navbar';
import dayjs from 'dayjs';
import { useSearchParams, Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Box, Divider, Container, MenuItem, Button, Select, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, Card, CardHeader } from '@mui/material';
import { Email, CalendarToday, ListAlt, Phone, Logout, Receipt, Schedule, AttachMoney, Payment, DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import fbslogo from "../images/fbs-red-logo.jpeg";
import venmoQr from '../images/venmo-code.jpg';
import cashappQr from '../images/cashapp-code.jpg';
import zelleQr from '../images/zelle-code.jpg'; import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import './BookingStatus.css';
import { sendAdminCashPaymentNotification } from '../utils/emailService'; // adjust path if needed

const api = process.env.REACT_APP_API_URL;
const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

const Dot = styled('span')(({ theme, status }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  display: 'inline-block',
  marginRight: theme.spacing(1),
  backgroundColor:
    status === 'confirmed'
      ? '#00ffa2'
      : status === 'denied'
        ? '#d1203d'
        : '#ccc',
  border: status === 'unconfirmed' ? '1px solid #ccc' : 'none',
}));


const BookingStatus = () => {
  const { bookingId } = useParams(); // Get booking ID from the URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formattedDate, setFormattedDate] = useState(dayjs(booking?.date).format('M/DD/YY'));
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryComponent = searchParams.get("component") || "dateHours";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(isLoggedIn === 'true');
  }, []);


  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${api}/bookings/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error("Booking not found");
        }
        const data = await response.json();
        setBooking(data);
        setPaymentMethod(data.paymentMethod || 'none');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const getDepositAmount = (hoursString) => {
    if (!hoursString) return null; // Handle missing data

    const parts = hoursString.split('/'); // Split at "/"
    if (parts.length < 2) return null; // Ensure valid format

    const priceString = parts[1].replace('$', '').trim(); // Remove "$" and trim spaces
    const price = parseFloat(priceString); // Convert to number

    if (isNaN(price)) return null; // Ensure it's a valid number

    return (price / 2).toFixed(2); // Calculate 50% deposit and format to 2 decimals
  };

  const renderInstructions = () => {
    switch (paymentMethod) {
      case 'venmo':
        return <img src={venmoQr} style={{ borderRadius: 8 }} alt="Venmo QR" loading="lazy" />;
      case 'cashapp':
        return <img src={cashappQr} style={{ borderRadius: 8 }} alt="Cash App QR" loading="lazy" />;
      case 'zelle':
        return <img src={zelleQr} style={{ borderRadius: 8 }} alt="Zelle QR" loading="lazy" />;
      case 'applepay':
        return (
          <div>
            <p style={{ fontSize: 16 }}><strong>To pay with Apple Pay on your own:</strong></p>
            <ol style={{ fontSize: 16 }}>
              <li style={{ marginBottom: 16 }}>Open Wallet on your iPhone/Mac.</li>
              <li style={{ marginBottom: 16 }}>Tap your card &gt; “Send”.</li>
              <li style={{ marginBottom: 16 }}>Enter: <strong>frombelowstudio@gmail.com</strong></li>
              <li style={{ marginBottom: 16 }}>Enter amount: <strong>${getDepositAmount(booking.hours)}</strong>.</li>
              <li>Hit “Pay” and include Booking ID <strong>{booking._id}</strong>.</li>
            </ol>
          </div>
        );
      case 'cash':
        return (
          <div>
            <p><strong>Bring the full amount in cash on session day.</strong></p>
            <p>Email <strong>frombelowstudio@gmail.com</strong> to confirm.</p>
          </div>
        );
      case 'none':
      default:
        return <p style={{ color: 'red' }}><strong>Select a payment method.</strong></p>;
    }
  };

  const handlePaymentMethodChange = async (event) => {
    const newMethod = event.target.value;
    setPaymentMethod(newMethod);

    try {
      const response = await fetch(`${api}/bookings/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod: newMethod }),
      });

      if (!response.ok) throw new Error('Failed to update payment method');

      const updatedBooking = await response.json();
      setBooking(updatedBooking); // Update local state

      // ✅ Send admin cash payment email if payment method is "cash"
      if (newMethod === 'cash') {
        await sendAdminCashPaymentNotification(
          adminEmail, // or process.env.ADMIN_EMAIL if using env
          updatedBooking.name,
          updatedBooking._id,
          'Cash'
        );
      }

      alert('Payment method updated successfully');
    } catch (error) {
      console.error('Error updating payment method:', error);
      alert('Error updating payment method');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <>
      <Header />

      {isLoggedIn && (
        <AppBar className="from-below-appbar" position="fixed">
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="/" target="_blank" style={{ textDecoration: 'none' }}>
              <img style={{ width: "80px" }} src={fbslogo} alt="Logo" />
            </Link>
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
                <Logout />
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}
      <Box
        style={{ minHeight: "100vh", height: "auto", backgroundColor: "#f4f6f8" }}
        className="section about"
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
        {isLoggedIn && (
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
              onClick={() => { }}
            >
              <CalendarToday style={{ color: "white" }} />
            </ListItem>
            <ListItem
              style={{ cursor: "pointer" }}
              onClick={() => { }}
            >
              <ListAlt style={{ color: "white" }} />
            </ListItem>
          </List>
          <Divider />
        </Box>
        )}
        <Container maxWidth="md" style={{ paddingTop: "0em" }}>
          <Card sx={{ backgroundColor: '#202020', color: '#e7e7e7', maxWidth: 390, margin: '0 auto' }}>
            <CardHeader
              titleTypographyProps={{ variant: 'subtitle1' }}
              title={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Dot className={booking.status === 'confirmed' ? 'confirmed-dot' : ''} status={booking.status} />
                  {`${booking.name}`}&nbsp;
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                    &nbsp;{formattedDate}
                  </span>

                </span>
              }
            />
            <List>
              <ListItem>
                <ListItemIcon><Receipt style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Booking Invoice" secondary={booking._id} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Email style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={booking.email} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Phone style={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Phone Number" secondary={booking.phoneNumber} />
              </ListItem>

              <ListItem>
                <ListItemIcon><Schedule style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Booking Hours/Total" secondary={booking.hours} />
              </ListItem>

              <ListItem>
                <ListItemIcon><AttachMoney style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="50% Deposit" secondary={`$${getDepositAmount(booking.hours)}`} />
              </ListItem>

              <ListItem>
                <ListItemIcon><Payment style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText primary="Deposit Status" secondary={booking.paymentStatus} />
              </ListItem>
            </List>

            <FormControl style={{ paddingLeft: 20, paddingRight: 20 }} fullWidth>
              <InputLabel id="payment-method">Payment Method</InputLabel>
              <Select
                disabled={isLoggedIn}
                label="payment-method"
                id="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '& .MuiOutlinedInput-input.Mui-disabled': {
                    '-webkit-text-fill-color': 'rgba(203, 203, 203, 0.62)',
                  },
                  '& MuiSelect-root.Mui-disabled.input:disabled': {
                    borderColor: 'rgba(203, 203, 203, 0.62)'
                  }
                }}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="venmo">Venmo</MenuItem>
                <MenuItem value="cashapp">Cash App</MenuItem>
                <MenuItem value="zelle">Zelle</MenuItem>
                <MenuItem value="applepay">Apple Pay</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
              </Select>
            </FormControl>
            <div style={{ padding: 20 }}>
              {renderInstructions()}
            </div>
          </Card>
        </Container>
      </Box>

    </>
  );
};

export default BookingStatus;
