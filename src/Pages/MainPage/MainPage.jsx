import React, { useEffect, useState } from 'react';
import TitleBar from '../../Components/TitleBar/TitleBar';
import '../../Components/styles/index.scss';
import { GetGradeUser } from '../../Components/Functions/requestProfile';
import NavBar from '../../Components/NavBar/NavBar';

const MainPage = () => {
  const [marks, setMarks] = useState({});
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
          setMarks(result.subjects);
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
      <div className="wrapper">
        <TitleBar />
        <div className="list_schoolSubject">
          {marks.length > 0 ? (
            marks.map((subject) => (
              <div className="schoolSubject" key={subject.id}>
                <p>{formatNameAbbreviate(subject.name)}</p>
                <span>{subject.mark}</span>
              </div>
            ))
          ) : (
            <div className="schoolSubject_notData">
              <span>Нет данных</span>
            </div>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default MainPage;
