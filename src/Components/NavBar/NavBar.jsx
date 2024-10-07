import React, { useState } from "react";
import "../styles/navBar.scss";
import {
  svgHome,
  svgCalendar,
  svgSettings,
  burgerMenu,
  clock,
  book,
  palette,
} from "./svg";
import { NavLink } from "react-router-dom";
import Modal from "../Modal/Modal";

const NavBar = ({ themeToggle, left, center, right }) => {
  const [modal, setModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = () => {
    setIsAnimating(true);
    setModal(true);
  };

  return (
    <>
      <Modal
        state={modal}
        theme={themeToggle}
        setState={setModal}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        type={"customization"}
      />
      <div className="navBar">
        <NavLink to={"/calls"} className="bar">
          {clock()} Расписание
        </NavLink>
        <div className={'palette'} onClick={openModal}>
          {palette()}
        </div>
        <NavLink to={"/diary"} className="bar">
          {book()} Дневник
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
