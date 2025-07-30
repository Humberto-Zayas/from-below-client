import React, { useEffect, useState } from 'react';
import Header from '../components/navbar';
import dayjs from 'dayjs';
import { useSearchParams, Link } from "react-router-dom";
import { AddToCalendarButton } from 'add-to-calendar-button-react';

import { AppBar, Toolbar, Typography, Box, Divider, Container, Grid, MenuItem, Button, Select, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, Card, CardHeader, Stack } from '@mui/material';
import { Email, CalendarToday, ListAlt, Phone, Logout, Receipt, Schedule, AttachMoney, Payment, Message, DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import fbslogo from "../images/fbs-red-logo.jpeg";
import venmoQr from '../images/venmo-code.png';
import cashappQr from '../images/cashapp-code.png';
import zelleQr from '../images/zelle-code.png';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import './BookingStatus.css';
import { sendAdminCashPaymentNotification } from '../utils/emailService'; // adjust path if needed
import { sendStatusEmail } from '../utils/emailService';

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
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
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
  }, [bookingId, bookings]);

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
    const amount = getDepositAmount(booking.hours);
    const bookingId = booking._id;

    const venmoMobileLink = `venmo://paycharge?txn=pay&recipients=FromBelowStudio&amount=${amount}&note=Booking ID ${bookingId}`;
    const venmoWebLink = `https://venmo.com/FromBelowStudio`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const venmoLink = isMobile ? venmoMobileLink : venmoWebLink;
    const cashAppLink = `https://cash.app/$FromBelowStudio/${amount}`;

    const commonInstruction = (qrImage, link, label) => (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 16 }}>
          To pay your deposit of <strong>${amount}</strong>, scan the QR or&nbsp;
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#00ffa2', fontWeight: 600 }}>
            tap here to open {label}
          </a>.
        </p>

        <p style={{ fontSize: 14, color: '#999' }}>
          Please include Booking ID <strong>{bookingId}</strong> in the notes.
        </p>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => navigator.clipboard.writeText(`Booking ID ${bookingId}`)}
          sx={{ mt: 1, mb: 3, color: '#00ffa2', borderColor: '#00ffa2' }}
        >
          Copy Booking ID to Clipboard
        </Button>

        <img src={qrImage} style={{ borderRadius: 8, maxWidth: '100%', marginBottom: 12 }} alt={`${label} QR`} loading="lazy" />
      </div>
    );

    switch (paymentMethod) {
      case 'venmo':
        return commonInstruction(venmoQr, venmoLink, 'Venmo');
      case 'cashapp':
        return commonInstruction(cashappQr, cashAppLink, 'Cash App');
      case 'zelle':
        return (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16 }}>
              To pay your deposit of <strong>${amount}</strong>, scan the QR and send payment via Zelle to <strong>youngavi03@yahoo.com</strong>.
            </p>
            <p style={{ fontSize: 14, color: '#999' }}>
              Include Booking ID <strong>{bookingId}</strong> in the memo.
            </p>
            <img src={zelleQr} style={{ borderRadius: 8, maxWidth: '100%', marginBottom: 12 }} alt="Zelle QR" loading="lazy" />
          </div>
        );
      case 'applepay':
        return (
          <div>
            <p style={{ fontSize: 16 }}><strong>To pay with Apple Pay on your own:</strong></p>
            <ol style={{ fontSize: 16 }}>
              <li style={{ marginBottom: 16 }}>Open Wallet on your iPhone/Mac.</li>
              <li style={{ marginBottom: 16 }}>Tap your card &gt; “Send”.</li>
              <li style={{ marginBottom: 16 }}>Enter: <strong>youngavi03@yahoo.com</strong></li>
              <li style={{ marginBottom: 16 }}>Enter amount: <strong>${amount}</strong>.</li>
              <li>Hit “Pay” and include Booking ID <strong>{bookingId}</strong>.</li>
            </ol>
          </div>
        );
      case 'cash':
        return (
          <Card sx={{ backgroundColor: '#2c2c2c', color: 'white', p: 2, mt: 0, borderLeft: '6px solid #00ffa2' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AttachMoney sx={{ fontSize: 40, color: '#00ffa2' }} />
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                  Bring the full amount in <span style={{ color: '#00ffa2' }}>cash</span> on your session day.
                </p>
                <p style={{ fontSize: '0.95rem', marginTop: 4 }}>
                  Please confirm by emailing <strong>frombelowstudio@gmail.com</strong>.
                </p>
              </div>
            </Stack>
          </Card>
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

  const handleUpdateStatus = async (bookingId, bookingEmail, newStatus) => {
    try {
      const response = await fetch(`${api}/bookings/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (response.ok) {
        const updatedBookings = bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);

        // Generate deposit link for confirmed bookings
        const depositLink =
          newStatus === 'confirmed'
            ? `${process.env.REACT_APP_FRONTEND_URL}/pay-deposit/${bookingId}`
            : null;

        // Send status email with the deposit link
        await sendStatusEmail(bookingEmail, newStatus, bookingId, depositLink);

        alert(`Booking status updated and email sent to client.`);
      } else {
        console.error('Error updating booking status:', response.statusText);
        alert('An error occurred while updating the booking status.');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('An error occurred while updating the booking status.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const ButtonsWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
  });

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
              <Link to="/admin?component=dateHours" style={{ textDecoration: 'none' }}>
                <ListItem
                  style={{ cursor: "pointer" }}
                >
                  <CalendarToday style={{ color: "white" }} />
                </ListItem>
              </Link>
              <Link to="/admin?component=bookings">
                <ListItem
                  style={{ cursor: "pointer" }}
                >
                  <ListAlt style={{ color: "white" }} />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Box>
        )}
        <Container sx={{ px: 0 }} maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} style={{ margin: '0 auto' }}>
              <Card sx={{ backgroundColor: '#202020', color: '#e7e7e7', maxWidth: 390, margin: '0 auto' }}>
                <CardHeader
                  titleTypographyProps={{ variant: 'subtitle1' }}
                  title={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <Dot className={booking.status === 'confirmed' ? 'confirmed-dot' : ''} status={booking.status} />
                      {`${booking.name}`}&nbsp;
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                        &nbsp;{dayjs(booking.date).format('M/DD/YY')}
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
                    <ListItemIcon><CalendarToday style={{ color: 'white' }} /></ListItemIcon>
                    <AddToCalendarButton
                      name="From Below Studio Recording Session"
                      options={['Apple', 'Google', 'iCal', 'Outlook.com', 'Yahoo', 'Microsoft365']}
                      lightMode="dark"
                      location="From Below Studio"
                      startDate={booking.date}
                      endDate={booking.date}
                      timeZone="America/New_York"
                      hideCheckmark
                      hideBackground
                    ></AddToCalendarButton>
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <Email style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Email" secondary={booking.email} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <Message style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Message" secondary={booking.message} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <Phone style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Phone Number" secondary={booking.phoneNumber} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon><Schedule style={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText
                      primary="Date and Hours"
                      secondary={dayjs(booking.date).format('M/DD/YY') + `, ${booking.hours}`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon><AttachMoney style={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="50% Deposit" secondary={`$${getDepositAmount(booking.hours)}`} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon><Payment style={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Deposit Status" secondary={booking.paymentStatus} />
                  </ListItem>
                  {isLoggedIn && (
                    <ListItem sx={{ flexWrap: 'wrap' }}>
                      <ListItemIcon>
                        <Dot
                          className={booking.status === 'confirmed' ? 'confirmed-dot' : ''}
                          status={booking.status}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Status" secondary={booking.status} />
                      <ButtonsWrapper sx={{ margin: '10px auto' }}>
                        <Button
                          sx={{
                            mr: 2,
                            color: '#00ffa2',
                            borderColor: 'rgba(65, 255, 186, .4)',
                            '&:hover': {
                              borderColor: '#00ffa2',
                            },
                            '&.MuiButton-root.Mui-disabled': {
                              color: 'rgba(223, 223, 223, 0.4)',
                              borderColor: 'rgba(210, 210, 210, 0.3)'
                            }
                          }}
                          disabled={booking.status === 'confirmed'}
                          variant="outlined"
                          onClick={() => handleUpdateStatus(booking._id, booking.email, 'confirmed')}
                        >
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Confirm'}
                        </Button>

                        <Button
                          variant="outlined"
                          sx={{
                            color: '#d1203d', borderColor: 'rgb(209 32 61 / 74%)', '&:hover': { borderColor: '#d1203d' },
                            '&.MuiButton-root.Mui-disabled': {
                              color: 'rgba(223, 223, 223, 0.4)',
                              borderColor: 'rgba(210, 210, 210, 0.3)'
                            }
                          }}
                          disabled={booking.status === 'denied'}
                          onClick={() => handleUpdateStatus(booking._id, booking.email, 'denied')}
                        >
                          {booking.status === 'denied' ? 'Denied' : 'Deny'}
                        </Button>
                      </ButtonsWrapper>
                    </ListItem>
                  )}
                </List>

                <FormControl style={{ paddingLeft: 16, paddingRight: 16 }} fullWidth>
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
                        'WebkitTextFillColor': 'rgba(203, 203, 203, 0.62)',
                      },
                      '& MuiSelect-root.Mui-disabled.input:disabled': {
                        borderColor: 'rgba(203, 203, 203, 0.62)'
                      }
                    }}
                  >
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
            </Grid>
          </Grid>
        </Container>
      </Box>

    </>
  );
};

export default BookingStatus;
