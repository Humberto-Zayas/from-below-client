import React, { useEffect, useState } from 'react';
import Header from '../components/navbar';
import { useParams } from 'react-router-dom';
import './BookingStatus.css';

const api = process.env.REACT_APP_API_URL;

const BookingStatus = () => {
  const { bookingId } = useParams(); // Get booking ID from the URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <>
      <Header />
      <div className='section pricing'>
        <div style={{margin: '0 auto', maxWidth: 960}}>
        <h2>Booking Details</h2>
        <p><strong>Booking Invoice:</strong> {booking._id}</p>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Booking Hours/Total:</strong> {booking.hours}</p>
        <p><strong>Deposit Due:</strong> </p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>50% Deposit:</strong> ${getDepositAmount(booking.hours)}</p>
        </div>
       
      </div>
    </>
  );
};

export default BookingStatus;
