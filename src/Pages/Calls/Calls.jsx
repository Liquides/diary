import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import "../../assets/styles/calls.scss";
import axios from "axios";

import "../../assets/styles/colors.scss";
import "../../assets/styles/themes.scss";
import { PreloadersDays } from "../../Components/Preloaders/Preloaders";

const Calls = () => {
  const [calls, setCalls] = useState([]);
  let [time, setTime] = useState(15);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [progress, setProgress] = useState(0);

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
    const currentTime = new Date().toLocaleTimeString("ru-RU", {
      timeZone: "Asia/Chita",
      hour: "2-digit",
      minute: "2-digit",
    });

    const currentPairIndex = lessons.findIndex((lesson) => {
      const startTime = lesson.startTime;
      const endTime = lesson.endTime;
      return currentTime >= startTime && currentTime <= endTime;
    });

    if (currentPairIndex !== -1) {
      console.log("Текущая пара:", lessons[currentPairIndex]);
      setCurrentLessonIndex(currentPairIndex);

      const updateProgress = () => {
        const currentTime = new Date().toLocaleTimeString("ru-RU", {
          timeZone: "Asia/Chita",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const [currentHour, currentMinute, currentSecond] = currentTime
          .split(":")
          .map(Number);
        const [startHour, startMinute] = lessons[currentPairIndex].startTime
          .split(":")
          .map(Number);
        const [endHour, endMinute] = lessons[currentPairIndex].endTime
          .split(":")
          .map(Number);

        const totalSeconds =
          (endHour - startHour) * 3600 + (endMinute - startMinute) * 60;
        const elapsedSeconds =
          (currentHour - startHour) * 3600 +
          (currentMinute - startMinute) * 60 +
          currentSecond;
        const progress = Math.min(100, (elapsedSeconds / totalSeconds) * 100);

        // Calculate remaining time
        const remainingSeconds = totalSeconds - elapsedSeconds;
        const remainingHours = Math.floor(remainingSeconds / 3600);
        const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const remainingSecondsDisplay = remainingSeconds % 60;

        // Format remaining time as hh:mm:ss
        const formattedRemainingTime = [
          remainingHours.toString().padStart(2, "0"),
          remainingMinutes.toString().padStart(2, "0"),
          remainingSecondsDisplay.toString().padStart(2, "0"),
        ].join(":");

        // Update state with formatted remaining time
        setRemainingTime(formattedRemainingTime);

        setProgress(progress);
      };

      updateProgress();

      const intervalId = setInterval(updateProgress, 1000);

      return () => clearInterval(intervalId);
    } else {
      console.log("Сейчас нет активных пар");
      setCurrentLessonIndex(null);
      setRemainingTime(null);
      setProgress(0);
    }
  };

  const formatNameAbbreviate = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length > 3) {
      const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
      return initials;
    } else {
      return name;
    }
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
          {calls.length > 0 ? (
            <div className="days">
              <div className="day">
                <div className="title">
                  {formatDate({ dateString: calls?.[0]?.date })}
                </div>
                <div className="callsList">
                  {calls?.[0]?.lessons.length === 0 && (
                    <div className="noCalls">Нет занятий</div>
                  )}
                  {calls?.[0]?.lessons.map((lesson, index) => (
                    <div className="object" key={index}>
                      <div
                        className={`call${!lesson?.name ? " noLesson" : ""}`}
                      >
                        {index === currentLessonIndex && (
                          <div
                            className="timer"
                            style={{ width: `${progress}%` }}
                          ></div>
                        )}
                        <div className="left">
                          <div className="id">{index + 1}</div>
                          <div
                            className={`nameObject${
                              !lesson?.name ? " noLesson" : ""
                            }`}
                          >
                            {lesson?.name
                              ? formatNameAbbreviate(lesson.name)
                              : "Нет занятия"}
                          </div>
                          <div className="timeToCall">
                            {lesson.startTime} - {lesson.endTime}
                          </div>
                        </div>
                        {index === currentLessonIndex && (
                          <div className="right">
                            <div className="timerNumber">{remainingTime}</div>
                          </div>
                        )}
                      </div>
                      <div
                        className={`dotPoint${
                          !lesson?.name ? " noLesson" : ""
                        }`}
                        style={{
                          opacity: index === currentLessonIndex ? 1 : 0.2,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="buttonsChangeDay">
                <button>
                  {formatDate({ dateString: calls?.[0]?.date, day: -1 })}
                </button>
                <button>
                  {formatDate({ dateString: calls?.[0]?.date, day: 1 })}
                </button>
              </div>
            </div>
          ) : (
            <PreloadersDays />
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Calls;
