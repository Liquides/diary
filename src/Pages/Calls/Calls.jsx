import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import "../../assets/styles/calls.scss";
import axios from "axios";

import "../../assets/styles/colors.scss";
import "../../assets/styles/themes.scss";

const Calls = () => {
  const [calls, setCalls] = useState([]);
  let [time, setTime] = useState(15);

  useEffect(() => {
    document.querySelector("body").classList.add(localStorage.getItem("theme"));
    document
      .querySelector("body")
      .classList.add(localStorage.getItem("accent_color"));
  }, []);

  useEffect(() => {
    const Data = async () => {
      try {
        const cookies = document.cookie;
        const allowedCookieKeys = [
          ".AspNetCore.Culture",
          ".AspNetCore.Session",
          ".AspNetCore.Cookies",
        ];
        const filteredCookies = cookies
          .split(";")
          .filter((cookie) => {
            const [key] = cookie.split("=");
            return allowedCookieKeys.includes(key.trim());
          })
          .join("; ");
        const response = await axios.post("http://localhost:3001/calls", {
          token: filteredCookies,
          studentId: localStorage.getItem("studentId"),
        });

        if (response.data?.error) {
          return false;
        } else {
          setCalls(response.data);

          timer({
            dataString: response.data[0].date,
            lessons: response.data[0].lessons,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    Data();
  }, []);

  const timer = ({ dataString, lessons }) => {
    const nowPara = lessons.map((lesson) => {
      const now = new Date();
      const lessonDate = new Date(lesson.date);
      const timeDifference = now.getTime() - lessonDate.getTime();
    });
  };

  const formatDate = ({ dateString, day }) => {
    const formatDate = new Date(dateString);

    const dayWeek = formatDate.toLocaleString("ru-RU", {
      weekday: "long",
    });

    const formatWeek = {
      понедельник: "ПН",
      вторник: "ВТ",
      среда: "СР",
      четверг: "ЧТ",
      пятница: "ПТ",
      суббота: "СБ",
      воскресенье: "ВС",
    };

    const formatMonth = {
      январь: "Января",
      февраль: "Февраля",
      март: "Марта",
      апрель: "Апреля",
      май: "Мая",
      июнь: "Июня",
      июль: "Июля",
      август: "Августа",
      сентябрь: "Сентября",
      октябрь: "Октября",
      ноябрь: "Ноября",
      декабрь: "Декабря",
    };

    console.log(
      formatDate.toLocaleString("ru-RU", {
        month: "long",
      })
    );

    if (day) {
      return `${formatWeek[dayWeek]} - ${
        parseInt(
          formatDate.toLocaleString("ru-RU", {
            day: "numeric",
          })
        ) + day
      } ${
        formatMonth[
          formatDate.toLocaleString("ru-RU", {
            month: "long",
          })
        ]
      }`;
    }

    return `${formatWeek[dayWeek]} - ${formatDate.toLocaleString("ru-RU", {
      day: "numeric",
    })} ${
      formatMonth[
        formatDate.toLocaleString("ru-RU", {
          month: "long",
        })
      ]
    }`;
  };

  return (
    <>
      <div className="wrapper">
        <div className="windowCalls">
          <div className="days">
            {/* <div className="day">
              <div className="title">
                {formatDate({ dateString: calls?.[0]?.date })}
              </div>
              <div className="callsList">
                {calls?.[0]?.lessons.length === 0 && (
                  <div className="noCalls">Нет занятий</div>
                )}
                {calls?.[0]?.lessons.map((lesson, index) => (
                  <div className="object">
                    <div className={`call${!lesson?.name ? ' noLesson' : ''}`}>
                      <div
                        className="timer"
                        style={{ width: `${time}%` }}
                      ></div>
                      <div className="id">{index + 1}</div>
                      <div
                        className={`nameObject ${
                          !lesson?.name ? ' noLesson' : ''
                        }`}
                      >
                        {lesson?.name || ' нет занятия'}
                      </div>
                      <div className="timeToCall">
                        {lesson.startTime} - {lesson.endTime}
                      </div>
                    </div>
                    <div
                      className={`dotPoint${!lesson?.name ? ' noLesson' : ''}`}
                    ></div>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="buttonsChangeDay">
              <button>
                {" "}
                {formatDate({ dateString: calls?.[0]?.date, day: -1 })}
              </button>
              <button>
                {" "}
                {formatDate({ dateString: calls?.[0]?.date, day: +1 })}
              </button>
            </div>
          </div>
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Calls;
