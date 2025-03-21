import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/api/userapi';
import { useDispatch } from 'react-redux';
import { setUserData } from '../services/store/authSlice';

interface TokenResponse {
  token: string;
}

const CallbackPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        
        const response = await getToken();
          localStorage.setItem('token', response.token);
          dispatch(setUserData({user: null, token: response.token}))

        
          navigate('/dashboard');
      
      } catch (error) {
        setError('An error occurred while processing your login.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {loading && !error && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Loading, please wait...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CallbackPage;
