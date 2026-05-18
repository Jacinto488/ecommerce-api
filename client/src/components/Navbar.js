import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link> |{' '}
      <Link to="/products">Products</Link> |{' '}
      <Link to="/cart">Cart</Link> |{' '}
      <Link to="/orders">Orders</Link> |{' '}
      
      {!token ? (
        <>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;