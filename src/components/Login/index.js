import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!password) {
      setError('Password cannot be empty');
      return;
    }

    // Pass the entered password to the parent component
    onLogin(password);
    setError(''); // Clear errors on successful submission
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
      </form>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Submit
      </Button>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default Login;
