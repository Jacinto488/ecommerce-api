import { useState } from 'react';
import API from '../services/api';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', form);

      // Save token
      localStorage.setItem('token', res.data.token);

      // Save user
      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      alert('Login successful');

      window.location.href = '/products';

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message || 'Login failed'
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;