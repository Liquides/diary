import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Auth } from './Pages/Auth/Auth';
import MainPage from './Pages/MainPage/MainPage';
import Calls from './Pages/Calls/Calls';
import { auth } from './Components/Functions/AuthDiary';
import ReAuth from './Components/ReAuth/ReAuth';

const isColorAndTheme = () => {
  const color = localStorage.getItem('color');
  const theme = localStorage.getItem('theme');

  if (!color) {
    localStorage.setItem('color', 'default');
  }

  if (!theme) {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const deviceTheme = prefersDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', deviceTheme);
  }
};

isColorAndTheme();

const checkCookies = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});

  if (
    !cookies['.AspNetCore.Culture'] ||
    !cookies['.AspNetCore.Session'] ||
    !cookies['.AspNetCore.Cookies']
  ) {
    return false;
  }

  return true;
};
const isAuthenticated = () => checkCookies();

const PrivateWrapper = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

const AuthWrapper = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/diary" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthWrapper>
        <Auth />
      </AuthWrapper>
    ),
  },
  {
    path: '/diary',
    element: (
      <PrivateWrapper>
        <MainPage />
      </PrivateWrapper>
    ),
  },
  {
    path: '/calls',
    element: (
      <PrivateWrapper>
        <Calls />
      </PrivateWrapper>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
