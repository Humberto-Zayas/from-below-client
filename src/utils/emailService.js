export const sendEmail = async (to, subject, text, bookingDetails, isAdmin = false) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // Determine the base URL based on the environment
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://frombelowstudio.com'
      : 'http://localhost:3000';

  const adminLink = `${baseUrl}/admin?component=bookings`;

  // Format the email details
  const formattedDetails = bookingDetails
    ? `
      ${isAdmin ? `${bookingDetails.name} has sent a new booking request. Update the booking status here: ${adminLink}.` : text}

      Booking Details:
      ----------------
      Name: ${bookingDetails.name}
      Email: ${bookingDetails.email}
      Phone Number: ${bookingDetails.phoneNumber}
      Message: ${bookingDetails.message}
      How Did You Hear: ${bookingDetails.howDidYouHear}
      Date: ${bookingDetails.date}
      Hours: ${bookingDetails.hours}
    `.trim()
    : text;

  // Send the email request to your backend
  const response = await fetch(`${apiUrl}/email/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, text, bookingDetails, isAdmin }),

  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
};

export const sendStatusEmail = async (to, status, bookingId, depositLink = null) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // Send the status update request to your backend
  const response = await fetch(`${apiUrl}/email/send-status-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, status, bookingId, depositLink }), // Include depositLink
  });

  if (!response.ok) {
    throw new Error('Failed to send status email');
  }

  return response.json();
};

export const sendBookingChangeEmail = async (to, name, id, newDate, newHours) => {
  console.log('frontend sendbookingchangeeamil ran')
  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await fetch(`${apiUrl}/email/send-booking-change-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, name, id, newDate, newHours }),
  });

  if (!response.ok) {
    throw new Error('Failed to send booking change email');
  }

  return response.json();
};

export const sendPaymentStatusEmail = async (to, name, id, paymentStatus) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await fetch(`${apiUrl}/email/send-payment-status-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, name, id, paymentStatus }),
  });

  if (!response.ok) {
    throw new Error('Failed to send payment status email');
  }

  return response.json();
};

export const sendAdminCashPaymentNotification = async (
  to,
  clientName,
  bookingId,
  paymentMethod,
  notes = ''
) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await fetch(`${apiUrl}/email/send-cash-payment-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, clientName, bookingId, paymentMethod, notes }),
  });

  if (!response.ok) {
    throw new Error('Failed to send admin cash payment notification email');
  }

  return response.json();
};


