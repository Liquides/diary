import React, { useEffect, useRef, useState } from "react";
import TitleBar from "../../Components/TitleBar/TitleBar";
import "../../Components/styles/index.scss";
import { GetGradeUser } from "../../Components/Functions/requestProfile";
import NavBar from "../../Components/NavBar/NavBar";
import {
  bookMark,
  calculator,
  Cat,
  chemistry,
  compas,
  dnk,
  dumbbells,
  Ghost,
  globus,
  hand,
  Heart,
  MagicStick,
  magnit,
  mark,
  monitor,
  people,
  Quest,
  showMarks,
} from "../../Components/NavBar/svg";
// import { CSSTransition } from 'react-transition-group';/
import BurgerMenu from "../../Components/BurgerMenu/BurgerMenu";
import Modal from "../../Components/Modal/Modal";
import "../../assets/styles/colors.scss";
import "../../assets/styles/themes.scss";
import ReAuth from "../../Components/ReAuth/ReAuth";
import { PreloadersDiary } from "../../Components/Preloaders/Preloaders";

const MainPage = () => {
  const [marks, setMarks] = useState({});
  const [info, setInfo] = useState({});
  const [open, setOpen] = useState(false);
  const subjectMark = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [subjectMarkHeight, setSubjectMarkHeight] = useState("100%");
  const [burgerState, setBurgerState] = useState(false);
  const [isOpenMarks, setIsOpenMarks] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [stateIcon, setStateIcon] = useState(localStorage.getItem("icon"));

  useEffect(() => {
    const themeType = localStorage.getItem("theme");
    const accentColor = localStorage.getItem("accent_color");

    document.querySelector("body").classList.add(themeType);
    document.querySelector("body").classList.add(accentColor);
  }, []);

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
  const openSubjectMarks = ({ subject }) => {
    subjectMark.current.classList.toggle("fadeIn");
    setOpen(!open);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      month: "numeric",
      day: "numeric",
    });
  };

  const subjectFormatIcon = ({ subject }) => {
    const subjectMapping = {
      Математика: calculator(),
      Литература: bookMark(),
      "Физическая культура": dumbbells(),
      ОБИЗР: compas(),
      Обществознание: people(),
      Физика: magnit(),
      Химия: chemistry(),
      Биология: dnk(),
      География: globus(),
      "Иностранный язык/2 подгруппа": hand(),
      "Информатика/2 группа": monitor(),
    };

    return subjectMapping[subject] || mark();
  };

  const funcFormatMark = ({ mark }) => {
    const markMapping = {
      Five: 5,
      Four: 4,
      Three: 3,
      Two: 2,
      One: 1,
    };

    return markMapping[mark] || "N/A";
  };
  const formatStateDay = (type) => {
    const stateMapping = {
      IsLate: "ОП",
    };
    return stateMapping[type] || "N/A";
  };
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        GetGradeUser(localStorage.getItem("studentId")).then((result) => {
          setMarks(result.table);
          setInfo(result.account.persons);
        });
      } catch (error) {
        // ReAuth();
        console.log(error);
      }
    };

    fetchMarks();
  }, []);
  const openMarks = () => {
    setOpenModal(true);
  };

  const iconCheck = (type) => {
    if (type === "Ghost") {
      return <Ghost />;
    } else if (type === "Heart") {
      return <Heart />;
    } else if (type === "MagicStick") {
      return <MagicStick />;
    } else if (type === "Cat") {
      return <Cat />;
    }
  };

  return (
    <>
      <div className="wrapper auth_wrapper">
        <div className="windowDiary">
          <div className="window_info_user" onClick={openMarks}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div className="designIconsProfile" key={index}>
                  {iconCheck(stateIcon)}
                </div>
              ))}
            <div className="left">
              <div className="img">
                {/* {info[0]?.firstName.charAt(0)}
                {info[0]?.lastName.charAt(0)} */}
                ИФ
              </div>
            </div>
            <div className="right">
              <p className="name_user">
                {/* {info[0]?.firstName} {info[0]?.lastName} */}
                Имя Фамилия
              </p>
              <span>онлайн</span>
            </div>
          </div>
          <div className="list_schoolSubject">
            {marks.daysWithMarksForSubject &&
            marks.daysWithMarksForSubject.length > 0 ? (
              marks.daysWithMarksForSubject
                .sort((a, b) => b.averageMark - a.averageMark)
                .map((subject, index) =>
                  subject.daysWithMarks.length > 0 ? (
                    <div
                      className="schoolSubject"
                      ref={subjectMark}
                      onClick={() => {
                        setOpenIndex(openIndex === index ? null : index);
                      }}
                      key={index}
                    >
                      <div className="topMark">
                        <div className="left">
                          <div className="svg-mark">
                            {subjectFormatIcon({
                              subject: formatNameAbbreviate(
                                subject.subjectName
                              ),
                            })}
                          </div>
                          <p className="iconSubject">
                            {formatNameAbbreviate(subject.subjectName)}
                          </p>
                        </div>
                        <div className="right">
                          <p>{subject.averageMark || "null"}</p>
                        </div>
                      </div>
                      {openIndex === index && (
                        <div className={`bottomMarks fadeIn`}>
                          <div className="listMarks">
                            {subject.daysWithMarks.map((day, dayIndex) => (
                              <div key={dayIndex} className="mark">
                                {day.markValues.length > 0 ? (
                                  <p>
                                    {day.markValues.map((mark, markIndex) => (
                                      <span key={markIndex}>
                                        {funcFormatMark({ mark }) || "N/A"}
                                        {markIndex !==
                                          day.markValues.length - 1 && ", "}
                                      </span>
                                    ))}
                                    <p className="dateMark">
                                      {formatDate(day.day)}
                                    </p>
                                  </p>
                                ) : (
                                  <p className="abenceType">
                                    {formatStateDay(day.absenceType)}

                                    <p className="dateMark">
                                      {formatDate(day.day)}
                                    </p>
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                          <div
                            className="closeMarks"
                            onClick={() => {
                              // setIsOpenMarks(!isOpenMarks);
                              // setInterval(() => {
                              //   // setOpenIndex(-1);
                              // }, 300);
                            }}
                          >
                            {showMarks()}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null
                )
            ) : (
              <PreloadersDiary />
            )}
          </div>
        </div>
        <Modal type={"profile"} state={openModal} setState={setOpenModal} />
        <NavBar stateIcon={setStateIcon} />
      </div>
    </>
  );
};

export default MainPage;
