import React, { useState } from 'react';
import '../styles/navBar.scss';
import { svgHome, svgCalendar, svgSettings, burgerMenu, clock, book, palette, Radio } from './svg';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal/Modal';

const NavBar = ({ themeToggle, left, center, right, stateIcon }) => {
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
        type={'customization'}
        stateIcon={stateIcon}
      />
      <div className="navBar">
        <NavLink to={'/calls'} className="bar">
          {clock()}
        </NavLink>
        <NavLink to={'/diary'} className="bar">
          {book()}
        </NavLink>
        <NavLink style={{ opacity: 0.5 }} to={'/radio'} className={'bar'}>
          <Radio />
          Скоро
        </NavLink>
        <div className={'palette'} onClick={openModal}>
          {palette()}
        </div>
      </div>
    </>
  );
};

export default NavBar;
