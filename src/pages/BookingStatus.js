import React, { useEffect, useState } from 'react';
import Header from '../components/navbar';
import Footer from '../components/Footer';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
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
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(booking?.paymentMethod || 'none');
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
        <div style={{ margin: '0 auto', maxWidth: 390, width: '90%', backgroundColor: '#202020' }}>
          <Dot
            className={booking.status === 'confirmed' ? 'confirmed-dot' : ''}
            status={booking.status}
          />
          <h2>Booking Details</h2>
          <p><strong>Booking Invoice:</strong> {booking._id}</p>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Booking Hours/Total:</strong> {booking.hours}</p>
          <p><strong>Deposit Due:</strong> </p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>50% Deposit:</strong> ${getDepositAmount(booking.hours)}</p>
          <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
          <FormControl fullWidth>
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
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {getPaymentInstructions()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingStatus;
