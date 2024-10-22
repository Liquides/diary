import axios from 'axios';

export const auth = async (login, password) => {
  try {
    const payload = { login, password };
    const response = await axios.post(
      'http://109.71.242.232:3001/auth',
      payload
    );

    if (
      response.data &&
      response.data.tenants &&
      response.data.tenants.SPO_20
    ) {
      localStorage.setItem(
        'studentId',
        response.data.tenants.SPO_20.studentRole.id
      );
      response.data.cookies.forEach((cookie, index) => {
        document.cookie = cookie
          .replace('httponly', '')
          .replace('secure', '')
          .trim();
      });

      localStorage.setItem('login', login);
      localStorage.setItem('password', password);

      return true;
    }
    return false;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

// ... existing code ...
