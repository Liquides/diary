import axios from 'axios';
import ReAuth from '../ReAuth/ReAuth';

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

    const response = await axios.post('http://109.71.242.232:3001/profile', {
      token: filteredCookies,
      studentId: user_id,
    });

    if (response.data?.error) {
      return false;
    } else {
      return response.data;
    }
  } catch (error) {
    ReAuth();
    console.error('Error fetching user grade:', error);
    throw error;
  }
};
