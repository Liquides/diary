import React from 'react';
import { auth } from '../Functions/AuthDiary';
import { useNavigate } from 'react-router-dom';

const ReAuth = async () => {
  const login = localStorage.getItem('login');
  const password = localStorage.getItem('password');

  await auth(login, password).then(async (result) => {
    if (result) {
      window.location.reload();
    }
  });

  return <div>ReAuth</div>;
};

export default ReAuth;
