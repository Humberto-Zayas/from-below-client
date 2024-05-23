import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, FormControl, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import BookingCard from './BookingCard';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import dayjs from 'dayjs';

const api = process.env.REACT_APP_API_URL;

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [openCardId, setOpenCardId] = useState(null); // Keep track of open card
  const [statusFilter, setStatusFilter] = useState('All'); // Status filter value
  const [dateFilter, setDateFilter] = useState(''); // Date filter value
  const [sortOrder, setSortOrder] = useState('asc'); // Track sort order

  useEffect(() => {
    const apiUrl = `${api}/bookings/bookings/`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('use effect bookings fetch: ', data)
        const currentDate = dayjs().startOf('day');
        const upcomingBookings = data.filter((booking) =>
          dayjs(booking.date, 'YYYY-MM-DD').isSame(currentDate) || dayjs(booking.date, 'YYYY-MM-DD').isAfter(currentDate)
        );
        const pastBookings = data.filter((booking) =>
          dayjs(booking.date, 'YYYY-MM-DD').isBefore(currentDate)
        );
        setBookings(upcomingBookings);
        setPastBookings(pastBookings);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
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
      } else {
        console.error('Error updating booking status:', response.statusText);
        alert('An error occurred while updating the booking status.');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('An error occurred while updating the booking status.');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`${api}/bookings/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
        setBookings(updatedBookings);
      } else {
        console.error('Error deleting booking:', response.statusText);
        alert('An error occurred while deleting the booking.');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('An error occurred while deleting the booking.');
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    // Compare booking dates based on sortOrder
    return sortOrder === 'asc'
      ? dayjs(a.date).diff(dayjs(b.date))
      : dayjs(b.date).diff(dayjs(a.date));
  });

  const sortedPastBookings = [...pastBookings].sort((a, b) => {
    // Compare booking dates based on sortOrder
    return sortOrder === 'asc'
      ? dayjs(a.date).diff(dayjs(b.date))
      : dayjs(b.date).diff(dayjs(a.date));
  });

  const toggleCard = (bookingId) => {
    if (openCardId === bookingId) {
      setOpenCardId(null);
    } else {
      setOpenCardId(bookingId);
    }
  };

  const resetFilters = () => {
    setStatusFilter('All');
    setDateFilter('');
  };

  return (
    <Container sx={{ px: 0 }} maxWidth="md">
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <FormControl sx={{ mr: 2, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
          <Select
            sx={{
              color: 'rgb(151 151 151)', // Non-focus color
              borderColor: 'rgb(151 151 151)', // Non-focus border color
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00ffa2 !important', // Focus border color
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(151 151 151)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgb(200 200 200)', // Hover border color
              },
              '& .MuiSelect-icon': {
                color: 'rgb(151 151 151)', // Replace with your off-white color
              },
            }}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={statusFilter}
            label="Status"
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <MenuItem value="All">Current Bookings</MenuItem>
            <MenuItem value="unconfirmed">Unconfirmed</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="denied">Denied</MenuItem>
            <MenuItem value="Past">Past Bookings</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{
            mr: 2,
            minWidth: 130,
            '& .MuiOutlinedInput-root': {
              color: 'red !important',
              '& fieldset': {
                color: 'rgb(151 151 151)',
                borderColor: 'rgb(151 151 151)',
              },
              '&:hover fieldset': {
                borderColor: 'rgb(151 151 151)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00ffa2',
              }
            },
            '& .MuiInputBase-input': {
              color: 'rgb(151 151 151) !important', // Change the text color here
            },
          }}
          label="Date Filter"
          type="date"
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
          InputLabelProps={{
            shrink: true,
            placeholder: 'mm/dd/yyyy'
          }}
        />
        <Button
          sx={{
            mr: 2,
            color: '#00ffa2',
            borderColor: 'rgba(65, 255, 186, .4)',
            '&:hover': { borderColor: '#00ffa2' },
          }}
          variant="outlined"
          onClick={toggleSortOrder} // Call toggleSortOrder when the button is clicked
        >
          {sortOrder === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
        <Button sx={{ ml: 'auto', color: '#00ffa2', borderColor: 'rgba(65, 255, 186, .4)', '&:hover': { borderColor: '#00ffa2' } }} variant="outlined" onClick={resetFilters}>
          <RestartAltIcon />
        </Button>
      </div>
      <Grid container spacing={3}>
        {statusFilter === 'Past' ? (
          sortedPastBookings.map((booking) => {
            const bookingDate = dayjs(booking.date, 'YYYY-MM-DD');
            const filterDate = dayjs(dateFilter, 'YYYY-MM-DD');
            if (dateFilter === '' || bookingDate.isSame(filterDate, 'day')) {
              return (
                <Grid item xs={12} md={6} key={booking._id}>
                  <BookingCard
                    handleDeleteBooking={handleDeleteBooking}
                    booking={booking}
                    openCardId={openCardId}
                    toggleCard={toggleCard}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                </Grid>
              );
            }
            return null;
          })
        ) : (
          sortedBookings.map((booking) => {
            const bookingDate = dayjs(booking.date, 'YYYY-MM-DD');
            const filterDate = dayjs(dateFilter, 'YYYY-MM-DD');
            if (
              (statusFilter === 'All' || booking.status === statusFilter) &&
              (dateFilter === '' || bookingDate.isSame(filterDate, 'day'))
            ) {
              return (
                <Grid item xs={12} md={6} key={booking._id}>
                  <BookingCard
                    handleDeleteBooking={handleDeleteBooking}
                    booking={booking}
                    openCardId={openCardId}
                    toggleCard={toggleCard}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                </Grid>
              );
            }
            return null;
          })
        )}
      </Grid>
    </Container>
  );
};

export default AdminBookings;
