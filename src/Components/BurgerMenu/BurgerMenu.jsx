import React from 'react';
import '../../assets/styles/burger.scss';
import { NavLink } from 'react-router-dom';

const BurgerMenu = ({ state, set }) => {
  return (
    <>
      <div
        className="burgerWindow"
        style={{ display: state ? 'block' : 'none' }}
        onClick={() => set(false)}
      >
        <div className="menuTop">
          <div className="pages">
            <NavLink to="/calls">Расписание звонков</NavLink>;
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
