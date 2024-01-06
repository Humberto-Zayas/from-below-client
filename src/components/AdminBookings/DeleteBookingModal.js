import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const DeleteBookingModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'black',
          border: '1px solid rgb(49, 49, 49)',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography align="center" sx={{ color: '#e7e7e7' }} variant="h6" id="delete-modal-title">
          Confirm Deletion
        </Typography>
        <Typography sx={{ color: '#e7e7e7' }} variant="body1" id="delete-modal-description">
          Are you sure you want to delete this booking?
        </Typography>
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
          <Button
            sx={{ mr: 2, mt: 2, color: '#d1203d', borderColor: 'rgb(209 32 61 / 74%)', '&:hover': { borderColor: '#d1203d' } }}

            variant="outlined"
            onClick={() => {
              onConfirm();
              onClose();
            }}>
            Delete
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2, color: '#00ffa2', borderColor: 'rgba(65, 255, 186, .4)', '&:hover': { borderColor: '#00ffa2' } }}
            onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteBookingModal;
