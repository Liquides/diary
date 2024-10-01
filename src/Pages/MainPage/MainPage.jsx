import React, { useEffect, useState } from 'react';
import TitleBar from '../../Components/TitleBar/TitleBar';
import '../../Components/styles/index.scss';
import { GetGradeUser } from '../../Components/Functions/requestProfile';
import NavBar from '../../Components/NavBar/NavBar';
import { mark } from '../../Components/NavBar/svg';

const MainPage = () => {
  const [marks, setMarks] = useState({});
  const [info, setInfo] = useState({});
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
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        GetGradeUser(localStorage.getItem('studentId')).then((result) => {
          setMarks(result.dashboard);
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
          {marks.subjects && marks.subjects.length > 0 ? (
            marks.subjects.map((subject, index) => (
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
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
