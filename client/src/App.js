import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;