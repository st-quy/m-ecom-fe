import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAccessToken } from '~/Auth/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeAccessToken();
    navigate('/sign-in');
  }, [navigate]);

  return (
    <div>
      <h1>Logout</h1>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;