import React, { useRef } from 'react';
import '../../assets/styles/main.scss';
import NavBar from '../../Components/NavBar/NavBar';
import AuthDiary from '../../Components/Functions/AuthDiary';
export const Auth = () => {
  const login = useRef(null);
  const password = useRef(null);
  return (
    <div className="wrapper">
      <NavBar />
      <div className="auth">
        <div className="form">
          <div className="title">
            <h2>Авторизация</h2>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Логин"
              autoComplete="off"
              ref={login}
            />
            <input
              type="password"
              placeholder="Пароль"
              autoComplete="off"
              ref={password}
            />
          </div>
        </div>
        <div className="auth_button">
          <button
            onClick={async () => {
              if (login.current.value && password.current.value) {
                await AuthDiary({
                  login: login.current.value,
                  password: password.current.value,
                });
              }
            }}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};
