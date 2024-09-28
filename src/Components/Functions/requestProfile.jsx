import axios from 'axios';

export const GetGradeUser = async (user_id) => {
  try {
    const cookies = document.cookie;
    const allowedCookieKeys = [
      '.AspNetCore.Culture',
      '.AspNetCore.Session',
      '.AspNetCore.Cookies',
    ];
    const filteredCookies = cookies
      .split(';')
      .filter((cookie) => {
        const [key] = cookie.split('=');
        return allowedCookieKeys.includes(key.trim());
      })
      .join('; ');

    const response = await axios.post('http://localhost:3000/profile', {
      token: filteredCookies,
      studentId: user_id,
    });

    if (response.data?.error) {
      return false;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching user grade:', error);
    throw error;
  }
};
