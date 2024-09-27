import React, { useRef } from "react";
import "../../assets/styles/main.scss";
import NavBar from "../../Components/NavBar/NavBar";
import { auth } from "../../Components/Functions/AuthDiary";
import { useNavigate } from "react-router-dom";
export const Auth = () => {
  const login = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
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
                const isAuthenticated = await auth(
                  login.current.value,
                  password.current.value
                );
                if (isAuthenticated) {
                  // navigate("/");
                } else {
                  alert("Неверный логин или пароль");
                }
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
