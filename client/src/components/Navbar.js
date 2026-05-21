import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  // Check if logged in
  const token =
    sessionStorage.getItem('token') ||
    sessionStorage.getItem('google_token');

  // Logout function
  const handleLogout = () => {

    sessionStorage.removeItem('token');

    sessionStorage.removeItem('google_token');

    sessionStorage.removeItem('user');

    alert('Logged out successfully');

    navigate('/login');

    // Refresh navbar state
    window.location.reload();
  };

  return (

    <nav
      style={{
        padding: '15px',
        borderBottom: '1px solid #ccc',
        marginBottom: '20px',
        display: 'flex',
        gap: '15px'
      }}
    >

      <Link to="/">Home</Link>

      <Link to="/products">Products</Link>

      {/* Logged OUT */}
      {!token && (
        <>
          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>
        </>
      )}

      {/* Logged IN */}
      {token && (
        <>
          <Link to="/cart">Cart</Link>

          <Link to="/orders">Orders</Link>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}

    </nav>
  );
}

export default Navbar;