import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../services/store/store';
import { getUser } from '../services/api/userapi';
import { setUserData } from '../services/store/authSlice';

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = localStorage.getItem('token') || '';



  useEffect(() => {
   
    
    if (!user && token) {
      const getUserDetails = async () => {
        try {
          const user = await getUser();
          dispatch(setUserData({ user, token }));
        } catch (error) {
          console.log(error);
          navigate('/');
        }
      
    }
    getUserDetails();
    }
  }, [user, dispatch, navigate, token]);


  if (!user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedWrapper;
