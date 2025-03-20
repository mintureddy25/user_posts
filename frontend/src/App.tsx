import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CallBack from './callback';

const App = () => {
  const googleClientId = '655728226324-bjjbg8josmu14tba9b5bfcck5ilbu7ot.apps.googleusercontent.com'; 
  // Replace with your actual Google Client ID
  
  // Handle redirect to /auth/google
  const handleRedirect = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Routes>
          {/* Add your Google login route */}
          <Route path="/" element={<button onClick={handleRedirect}>Go to Google</button>} />
          
          {/* Add callback route */}
          <Route path="/callback" element={<CallBack />} />
          
          {/* Add more routes if necessary */}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
