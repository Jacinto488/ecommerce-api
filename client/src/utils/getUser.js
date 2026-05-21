import { jwtDecode } from 'jwt-decode';

const getUser = () => {

  const token = sessionStorage.getItem('token');

  if (!token) return null;

  try {

    return jwtDecode(token);

  } catch (err) {

    return null;
  }
};

export default getUser;