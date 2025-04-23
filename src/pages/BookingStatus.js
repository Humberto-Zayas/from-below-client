import React, { useEffect, useState } from 'react';
import Header from '../components/navbar';
import Footer from '../components/Footer';
import dayjs from 'dayjs';
import { MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, Card, CardHeader } from '@mui/material';
import { Email, Phone, Receipt, Schedule, AttachMoney, Payment, DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import venmoQr from '../images/venmo-code.jpg';
import cashappQr from '../images/cashapp-code.jpg';
import zelleQr from '../images/zelle-code.jpg';import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import './BookingStatus.css';

const api = process.env.REACT_APP_API_URL;

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
  console.log('fetched booking: ', booking)
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(booking?.paymentMethod || 'none');
  const [formattedDate, setFormattedDate] = useState(dayjs(booking?.date).format('M/DD/YY'));
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${api}/bookings/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error("Booking not found");
        }
        const data = await response.json();
        setBooking(data);
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

  const getPaymentInstructions = () => {
    if (paymentMethod === 'none') {
      return <p style={{ color: 'red' }}><strong>Your session will not be valid unless you choose a payment method.</strong></p>;
    }

    if (['venmo', 'cashapp', 'zelle'].includes(paymentMethod)) {
      return (
        <div>
          <p><strong>Please pay a 50% deposit of ${getDepositAmount(booking.hours)} via {paymentMethod}.</strong></p>
          <p><strong>Admin {paymentMethod} Info:</strong></p>
          <ul>
            <li>Venmo: @FromBelowStudio</li>
            <li>Cash App: $FromBelowStudio</li>
            <li>Zelle: frombelowstudio@gmail.com</li>
          </ul>
          <p>Include your <strong>Booking ID/Invoice Number: {booking._id}</strong> in the payment description.</p>
          <p>After payment, email proof of payment to <strong>frombelowstudio@gmail.com</strong>.</p>
          <img src={`${venmoQr}`} alt='venmo-code' loading="lazy" />
        </div>
      );
    }

    if (paymentMethod === 'cash') {
      return (
        <div>
          <p><strong>Please bring the full amount in cash on the day of your session.</strong></p>
          <p>Email <strong>frombelowstudio@gmail.com</strong> to confirm that you will be paying in cash.</p>
        </div>
      );
    }

    return null;
  };

  const renderInstructions = () => {
    switch(paymentMethod) {
      case 'venmo':
        return <img src={venmoQr} alt="Venmo QR" loading="lazy" />;
      case 'cashapp':
        return <img src={cashappQr} alt="Cash App QR" loading="lazy" />;
      case 'zelle':
        return <img src={zelleQr} alt="Zelle QR" loading="lazy" />;
      case 'applepay':
        return (
          <div>
            <p style={{fontSize: 16}}><strong>To pay with Apple Pay on your own:</strong></p>
            <ol style={{fontSize: 16}}>
              <li style={{marginBottom: 16}}>Open Wallet on your iPhone/Mac.</li>
              <li style={{marginBottom: 16}}>Tap your card &gt; “Send”.</li>
              <li style={{marginBottom: 16}}>Enter: <strong>frombelowstudio@gmail.com</strong></li>
              <li style={{marginBottom: 16}}>Enter amount: <strong>${getDepositAmount(booking.hours)}</strong>.</li>
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
        return <p style={{ color:'red' }}><strong>Select a payment method.</strong></p>;
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

      alert('Payment method updated successfully');
    } catch (error) {
      console.error('Error updating payment method:', error);
      alert('Error updating payment method');
    }
  };

  return (
    <>
      <Header />
      <div className='section about'>
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

          <FormControl style={{paddingLeft: 20, paddingRight: 20}} fullWidth>
            <InputLabel id="payment-method">Payment Method</InputLabel>
            <Select
              label="payment-method"
              id="payment-method"
              defaultValue=""
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
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
          <div style={{ padding:20 }}>
            {renderInstructions()}
          </div>
        </Card>
      </div>
      {/* last div */}
      <Footer />
    </>
  );
};

export default BookingStatus;
