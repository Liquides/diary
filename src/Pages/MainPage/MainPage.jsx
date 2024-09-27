import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import "../../Components/styles/index.scss";
import { GetGradeUser } from "../../Components/Functions/requestProfile";

const MainPage = () => {
  GetGradeUser({ user_id: 123 });
  return (
    <>
      <div className="wrapper">
        <NavBar />
        <div className="list_schoolSubject">
          <div className="schoolSubject">
            <span>5</span>
            <p>Математика</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
