import express from "express";
import axios from "axios";
import fetch from "node-fetch";
import cors from "cors";
import { Navigate } from "react-router-dom";
import crypto from "crypto";

const app = express();
app.use(express.json());
const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/auth", async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const newPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("base64");
    console.log(newPassword);
    const response = await axios.post(
      "https://poo.zabedu.ru/services/security/login",
      {
        login: login,
        password: newPassword,
        isRemember: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Получаем куки из ответа
    const cookies = response.headers["set-cookie"];

    // Отправляем куки вместе с данными ответа
    res.setHeader("Set-Cookie", cookies);
    return res.json({
      ...response.data,
      cookies: cookies,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Неверный логин или пароль" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
