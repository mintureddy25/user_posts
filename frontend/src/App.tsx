import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './features/login';
import CallbackPage from './components/callback';
import Dashboard from './features/dashboard';
import Post from './features/post';
import ProtectedWrapper from './components/protectedWrapper';


const App = () => {
  return (
    <>
      <ToastContainer autoClose={2000} />
      
      <Router>
        {/* Public Routes */}
        <Header />
        <Routes>
        
          <Route path='/' element={<Login />} />
          <Route path='/callback' element={<CallbackPage />} />
          <Route path='/dashboard/:id' element={<Post />} />
        </Routes>
          <Routes>
            <Route path='/dashboard' element={<ProtectedWrapper><Dashboard /></ProtectedWrapper>} />
          </Routes>
      </Router>
    </>
  );
};

export default App;
