import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/main.scss';
import { auth } from '../../Components/Functions/AuthDiary';
import { useNavigate } from 'react-router-dom';
import { info } from '../../Components/NavBar/svg';
import NavBar from '../../Components/NavBar/NavBar';
import '../../assets/styles/auth.scss';
export const Auth = () => {
  const login = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const errRef = useRef(null);

  useEffect(() => {
    const themeType = localStorage.getItem('theme');
    const accentColor = localStorage.getItem('accent_color');

    document.querySelector('body').classList.add(themeType);
    document.querySelector('body').classList.add(accentColor);
  }, []);
  const errMessageView = ({ type }) => {
    if (type === 'auth') {
      setErr(true);
    }
  };

  return (
    <div className="wrapper">
      <div className="auth">
        <div className="form">
          <div className="title">
            <h2>CHPK App</h2>
          </div>
          <div className="inputs">
            <input type="text" placeholder="Логин" autoComplete="off" ref={login} />
            <input type="password" placeholder="Пароль" autoComplete="off" ref={password} />
            <div className="check">
              <input type="checkbox" id="check" />
              <label htmlFor="check">Запомнить меня</label>
            </div>
          </div>
          {err && (
            <div className="errorMessage" ref={errRef}>
              {info()}
              <span>Заполните все поля</span>
            </div>
          )}
        </div>
        <div className="auth_button">
          <button
            onClick={async () => {
              if (login.current.value && password.current.value) {
                const isAuthenticated = await auth(login.current.value, password.current.value);
                if (isAuthenticated) {
                  navigate('/diary');
                } else {
                  alert('Неверный логин или пароль');
                }
              } else {
                errMessageView({ type: 'auth' });
              }
            }}
          >
            Авторизация
          </button>
        </div>
      </div>
      {/* <NavBar left={false} center={true} right={false} /> */}
    </div>
  );
};
