// src/components/GoogleLogin.tsx

import React, { useState } from 'react';
import { GoogleLogin, GoogleCredentialResponse } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginComponent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = async (response: GoogleCredentialResponse) => {
    const { credential } = response;

    try {
      // Send the token to your backend for verification and user authentication
      const res = await axios.get('http://localhost:3000/auth/google/redirect', {
        headers: {
          Authorization: `Bearer ${credential}`,
        },
      });

      // Store JWT token in localStorage
      localStorage.setItem('jwt', res.data.jwt);
      alert('Login successful!');
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  const handleLoginError = () => {
    setError('Login failed. Please try again.');
  };

  return (
    <div>
      <h1>Login with Google</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default GoogleLoginComponent;
