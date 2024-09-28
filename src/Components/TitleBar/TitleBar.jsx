import React from 'react';
import '../styles/TitleBar.scss';
const TitleBar = () => {
  return (
    <>
      <div className="header_bar">
        <div className="nav_bar">
          <div className="logo">
            <span>ЧПК</span>
            <span>дневник</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleBar;
