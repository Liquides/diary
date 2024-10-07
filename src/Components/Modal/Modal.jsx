import "../styles/modal.scss";
import { cat, ghost, heart, magicStick } from "../NavBar/svg";
import { useEffect, useRef, useState } from "react";
import ModalApperance from "./ModalApperance";
import ModalProfile from "./ModalProfile";

const Modal = ({ state, setState, isAnimating, setIsAnimating, type }) => {
  switch (type) {
    case "customization":
      return (
        <ModalApperance
          state={state}
          setState={setState}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          type={type}
        />
      );
    case "profile":
      return (
        <ModalProfile
          state={state}
          setState={setState}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          type={type}
        />
      );
    default:
      return null;
  }
  return null;
};

export default Modal;
