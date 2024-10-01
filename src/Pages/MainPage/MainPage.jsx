import React, { useEffect, useRef, useState } from 'react';
import TitleBar from '../../Components/TitleBar/TitleBar';
import '../../Components/styles/index.scss';
import { GetGradeUser } from '../../Components/Functions/requestProfile';
import NavBar from '../../Components/NavBar/NavBar';
import { mark } from '../../Components/NavBar/svg';
import { CSSTransition } from 'react-transition-group';

const MainPage = () => {
  const [marks, setMarks] = useState({});
  const [info, setInfo] = useState({});
  const [open, setOpen] = useState(false);
  const subjectMark = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [subjectMarkHeight, setSubjectMarkHeight] = useState('100%');
  const formatNameAbbreviate = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 2) {
      const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
      return initials;
    } else {
      return name;
    }
  };
  const openSubjectMarks = ({ subject }) => {
    subjectMark.current.classList.toggle('fadeIn');
    setOpen(!open);
  };

  const funcFormatMark = ({ mark }) => {
    const markMapping = {
      Five: 5,
      Four: 4,
      Three: 3,
      Two: 2,
      One: 1,
    };

    return markMapping[mark] || 'N/A';
  };
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        GetGradeUser(localStorage.getItem('studentId')).then((result) => {
          setMarks(result.table);
          setInfo(result.account.persons);
          console.log(marks);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarks();
  }, []);

  return (
    <>
      <div className="wrapper auth_wrapper">
        <div className="windowDiary">
          <div className="window_info_user">
            <div className="left">
              <div className="img">
                {info[0]?.firstName.charAt(0)}
                {info[0]?.lastName.charAt(0)}
              </div>
            </div>
            <div className="right">
              <p className="name_user">
                {info[0]?.firstName} {info[0]?.lastName}
              </p>
              <span>онлайн</span>
            </div>
          </div>
          <div className="list_schoolSubject">
            {/* {marks.table && marks.table.length > 0 ? (
            marks.table.map((subject, index) => (
              <div className="schoolSubject" key={index}>
                <div className="left">
                  <div className="svg-mark">{mark()}</div>
                  <p>{formatNameAbbreviate(subject.name)}</p>
                </div>
                <div className="right">
                  <p>{subject.mark}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="schoolSubject_notData">
              <span>Нет данных</span>
            </div>
          )} */}

            {marks.daysWithMarksForSubject &&
            marks.daysWithMarksForSubject.length > 0
              ? marks.daysWithMarksForSubject.map((subject, index) =>
                  subject.daysWithMarks.length > 0 ? (
                    <div
                      className="schoolSubject"
                      ref={subjectMark}
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      key={index}
                    >
                      <div className="topMark">
                        <div className="left">
                          <div className="svg-mark">{mark()}</div>
                          <p>{subject.subjectName}</p>
                        </div>
                        <div className="right">
                          <p>{subject.averageMark || 'null'}</p>
                        </div>
                      </div>
                      {openIndex === index && (
                        <div className="bottomMarks">
                          <div className="listMarks">
                            <div className="windowShadow"></div>
                            {[...subject.daysWithMarks].map((marks, index) => (
                              <div key={index} className="mark">
                                {marks.markValues.length > 0 ? (
                                  marks.markValues.map((mark, index) => (
                                    <p key={index}>
                                      {funcFormatMark({ mark }) || 'N/A'}
                                      {index !== marks.markValues.length - 1 &&
                                        ',  '}
                                    </p>
                                  ))
                                ) : (
                                  <p>Null</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null
                )
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
