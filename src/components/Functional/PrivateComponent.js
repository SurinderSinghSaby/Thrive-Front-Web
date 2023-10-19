import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function PrivateComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn } = useAuth(); // Use only this line for isLoggedIn

  useEffect(() => {
    console.log("Is Logged In:", isLoggedIn);
    if (!isLoggedIn) {
      // If the user is not logged in, redirect them to the landing page.
      navigate('/landing', { state: { from: location } });
    }
  }, [isLoggedIn, navigate, location]);

  return isLoggedIn ? <Outlet /> : null;
}

export default PrivateComponent;

