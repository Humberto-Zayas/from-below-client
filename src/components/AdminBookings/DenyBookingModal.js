import React from 'react';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';

const DenyBookingModal = ({ isOpen, onClose, onConfirm, denyReason, setDenyReason }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="deny-modal-title"
      aria-describedby="deny-modal-description"
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
        <Typography align="center" sx={{ color: '#e7e7e7', mb: 2 }} variant="h6" id="deny-modal-title">
          Reason for Denial
        </Typography>
        <Typography sx={{ color: '#e7e7e7', mb: 2 }} variant="body1" id="deny-modal-description">
          Provide additional context to why this booking is denied:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={denyReason}
          onChange={(e) => setDenyReason(e.target.value)}
          placeholder="Write the reason here..."
          InputProps={{
            style: {
              color: 'white',
              backgroundColor: '#1a1a1a',
              borderColor: '#444'
            }
          }}
        />
        <Box sx={{ justifyContent: 'center', display: 'flex', mt: 3 }}>
          <Button
            sx={{ mr: 2, color: '#d1203d', borderColor: 'rgb(209 32 61 / 74%)', '&:hover': { borderColor: '#d1203d' } }}
            variant="outlined"
            onClick={() => {
              onConfirm(); // parent handles closing + sending the reason
            }}
          >
            Deny
          </Button>
          <Button
            variant="outlined"
            sx={{ color: '#00ffa2', borderColor: 'rgba(65, 255, 186, .4)', '&:hover': { borderColor: '#00ffa2' } }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DenyBookingModal;