const sendEmail = async (to, subject, text, bookingDetails, isAdmin = false) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // Format the email details
  const formattedDetails = bookingDetails
    ? `
      ${isAdmin ? 'There is a new booking request.' : text}

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

export default sendEmail;
