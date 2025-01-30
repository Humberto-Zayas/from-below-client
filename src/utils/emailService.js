export const sendEmail = async (to, subject, text, bookingDetails, isAdmin = false) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // Format the email details
  const formattedDetails = bookingDetails
    ? `
      ${isAdmin ? `${bookingDetails.name} has sent a new booking request.` : text}

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
  const response = await fetch(`${apiUrl}/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, text: formattedDetails }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
};

export const sendStatusEmail = async (to, status, bookingId, depositLink = null) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // Send the status update request to your backend
  const response = await fetch(`${apiUrl}/send-status-email`, {
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


