import React from "react";
import "../../assets/styles/main.scss";
import NavBar from "../../Components/NavBar/NavBar";

export const Auth = () => {
  return (
    <div className="wrapper">
      {/* <NavBar /> */}
      <div className="auth">
        <div className="form">
          <div className="title">
            <h2>Авторизация</h2>
          </div>
          <div className="inputs">
            <input type="text" />
            <input type="password" />
          </div>
          <div className="auth_button">
            <button>Войти</button>
          </div>
        </div>
      </div>
    </div>
  );
};
