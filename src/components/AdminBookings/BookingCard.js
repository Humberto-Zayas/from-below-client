import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Card, CardContent, CardHeader, Collapse, Button, List, ListItem, ListItemText, ListItemIcon, Drawer, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Email, Phone, Message, Hearing, AccessTime, Edit, Launch, Receipt, DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/system';
import '../../pages/Admin.css';
import EditBooking from './EditBooking';
import DeleteBookingModal from './DeleteBookingModal';

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

const ButtonsWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
});

const BookingCard = ({ booking, openCardId, toggleCard, handleUpdateStatus, handleDeleteBooking }) => {
  const [formattedDate, setFormattedDate] = useState(dayjs(booking.date).format('M/DD/YY'))
  const [hours, setHours] = useState(booking.hours);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(booking.paymentStatus || 'unpaid');
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleBookingUpdateAndFormat = (updatedHours, updatedFormattedDate) => {
    setHours(updatedHours);
    setFormattedDate(updatedFormattedDate);
  };
  const handlePaymentStatusChange = async (event) => {
    const newStatus = event.target.value;
    setPaymentStatus(newStatus);
  
    try {
      const response = await fetch(`${api}/bookings/bookings/${booking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }
  
      const updatedBooking = await response.json();
      console.log('Payment status updated:', updatedBooking);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Card sx={{ backgroundColor: '#202020', color: '#e7e7e7' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'subtitle1' }}
        title={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Dot className={booking.status === 'confirmed' ? 'confirmed-dot' : ''} status={booking.status} />
            {`${booking.name}`}&nbsp;
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>
              &nbsp;{formattedDate}
            </span>
            <DeleteOutlinedIcon
              sx={{ marginLeft: 'auto', cursor: 'pointer' }}
              onClick={openDeleteModal}
            />
          </span>
        }
        action={
          <Button sx={{ color: '#00ffa2' }} size="small" onClick={() => toggleCard(booking._id)}>
            {openCardId === booking._id ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Button>
        }
      />
      <Collapse in={openCardId === booking._id}>
        <CardContent style={{ padding: '0' }}>
          <List>
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
              <ListItemIcon>
                <Message style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Message" secondary={booking.message} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Hearing style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="How Did You Hear About Us"
                secondary={booking.howDidYouHear}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTime style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="Date and Hours"
                secondary={`${formattedDate}, ${hours}`}
              />
              <ListItemIcon>
                <Button disabled={booking.status === 'unconfirmed' || booking.status === 'denied'}>
                  <Edit
                    style={{
                      color: booking.status === 'unconfirmed' || booking.status === 'denied' ? '#4e4e4e' : 'white',
                      cursor: 'pointer',
                    }}
                    onClick={handleDrawerOpen}
                  />
                </Button>
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Receipt style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary="Booking Invoice #"
                secondary={booking._id}
              />
              <ListItemIcon>
                <Button>
                  <Launch
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                    }}
                    onClick={() => window.open(`/booking/${booking._id}`, '_blank')}
                  />
                </Button>
              </ListItemIcon>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Receipt style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Payment Status" />
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={paymentStatus}
                  onChange={handlePaymentStatusChange}
                  sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00ffa2' },
                    '.MuiSvgIcon-root': { color: 'white' },
                  }}
                >
                  <MenuItem value="unpaid">Unpaid</MenuItem>
                  <MenuItem value="deposit_paid">Deposit Paid</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </ListItem>

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
                    mr: 2, color: '#00ffa2', borderColor: 'rgba(65, 255, 186, .4)', '&:hover': {
                      borderColor: '#00ffa2', // Change the border color on hover
                    },
                  }}
                  variant="outlined"
                  onClick={() => handleUpdateStatus(booking._id, booking.email, 'confirmed')}
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: '#d1203d', borderColor: 'rgb(209 32 61 / 74%)', '&:hover': { borderColor: '#d1203d' } }}
                  onClick={() => handleUpdateStatus(booking._id, booking.email, 'denied')}
                >
                  Deny
                </Button>
              </ButtonsWrapper>
            </ListItem>
          </List>
        </CardContent>
        <DeleteBookingModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => {
            handleDeleteBooking(booking._id);
          }}
        />
      </Collapse>
      <Drawer
        className='booking-drawer'
        anchor="bottom"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <EditBooking
          id={booking._id}
          value={formattedDate}
          hours={booking.hours}
          onBookingUpdate={handleBookingUpdateAndFormat}
          closeDrawer={handleDrawerClose}
        />
      </Drawer>
    </Card>
  );
};

export default BookingCard;
