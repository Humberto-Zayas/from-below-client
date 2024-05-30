// emailService.js
const sendEmail = async (to, subject, text) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, text }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
};

export default sendEmail;
