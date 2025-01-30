import React, { useEffect, useState } from 'react';
import Header from '../components/navbar';
import { useParams } from 'react-router-dom';

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

  return (
    <>
      <Header />
      <div className='section pricing'>
        <h2>Booking Details</h2>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Date:</strong> {booking.date}</p>
      </div>
    </>
  );
};

export default BookingStatus;
