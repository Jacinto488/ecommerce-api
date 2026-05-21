import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

  const token =
    sessionStorage.getItem('token') ||
    sessionStorage.getItem('google_token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;