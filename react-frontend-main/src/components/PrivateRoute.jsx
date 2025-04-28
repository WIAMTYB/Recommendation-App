import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import clientService from '../api/clients/clientService';
import { ScaleLoader } from 'react-spinners';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await clientService.checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        console.err("Failed checking authentification",error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return (
    <div className="text-center mt-20">
      <ScaleLoader className='text-orange-500' />
    </div>
    
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;