import { useState } from 'react';

import API from '../services/api';

import { GoogleLogin } from '@react-oauth/google';


function Login() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post(
        '/auth/login',
        form
      );

      // Save token
      sessionStorage.setItem(
        'token',
        res.data.token
      );

      // Save user
      sessionStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      alert('Login successful');

      window.location.href = '/products';

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        'Login failed'
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div style={{ padding: '20px' }}>

      <h1>Login</h1>

      {/* Normal Login Form */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          gap: '10px',
          marginBottom: '20px'
        }}
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>


      {/* Google Login */}

      <h3>Or Login With Google</h3>

      <GoogleLogin

        onSuccess={(credentialResponse) => {

          console.log(credentialResponse);

          alert('Google login successful');

          // TEMPORARY:
          // Later we will send this token to backend

          sessionStorage.setItem(
            'google_token',
            credentialResponse.credential
          );

          window.location.href = '/products';
        }}

        onError={() => {

          console.log('Google Login Failed');

          alert('Google Login Failed');
        }}
      />

    </div>
  );
}

export default Login;