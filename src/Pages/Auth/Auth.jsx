import React from "react";

export const Auth = () => {
  return (
    <div className="wrapper">
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
