/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/verify')
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error('Error verifying authentication:', error);
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Display a loading indicator while checking authentication
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
