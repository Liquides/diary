import express from 'express';
import axios from 'axios';
import fetch from 'node-fetch';
import cors from 'cors';
import { Navigate } from 'react-router-dom';
import crypto from 'crypto';

const app = express();
app.use(express.json());
const port = 3001;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.post('/auth', async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const newPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('base64');
    console.log(newPassword);
    const response = await axios.post(
      'https://poo.zabedu.ru/services/security/login',
      {
        login: login,
        password: newPassword,
        isRemember: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Получаем куки из ответа
    const cookies = response.headers['set-cookie'];
    cookies.push('.AspNetCore.Culture=c%3Dru%7Cuic%3Dru; path=/');

    res.setHeader('Set-Cookie', cookies);
    return res.json({
      ...response.data,
      cookies: cookies,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Неверный логин или пароль' });
  }
});
app.post('/profile', async (req, res) => {
  try {
    const accountResponse = await axios.get(
      'https://poo.zabedu.ru/services/security/account-settings',
      {
        headers: {
          cookie: req.body.token,
        },
        withCredentials: true,
      }
    );

    const dashboardResponse = await axios.get(
      `https://poo.zabedu.ru/services/students/${req.body.studentId}/dashboard`,
      {
        headers: {
          cookie: req.body.token,
        },
        withCredentials: true,
      }
    );

    return res.json({
      account: accountResponse.data,
      dashboard: dashboardResponse.data,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Не удалось получить профиль' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
