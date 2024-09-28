import React from 'react';
import '../styles/navBar.scss';
import { svgHome, svgCalendar, svgSettings } from './svg';

const NavBar = () => {
  return (
    <div className="bottom_navBar">
      <div className="button_link">{svgCalendar()}</div>
      <div className="button_link">{svgHome()}</div>
      <div className="button_link">{svgSettings()}</div>
    </div>
  );
};

export default NavBar;
