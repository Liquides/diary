import React, { useRef } from "react";
import "../../assets/styles/main.scss";
import NavBar from "../../Components/NavBar/NavBar";
import { auth } from "../../Components/Functions/AuthDiary";
import { useNavigate } from "react-router-dom";
export const Auth = () => {
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
      </div>
    </div>
  );
};
