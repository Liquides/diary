import React from 'react';
import axios from 'axios';
import crypto from 'crypto';

const AuthDiary = async ({ login, password }) => {
  const auth = async () => {
    await fetch('https://poo.zabedu.ru/services/security/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: 'гончаренко571',
        password: 'm0yGJDPXbytv4XNbmVGxwsXdG7ntQrKdvOBXjeHEhEw=',
        isRemember: false,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.tenants.SPO_20.studentRole.id);
      });
  };
  auth();
};

export default AuthDiary;
