import React, { useState } from "react";

const ModalProfile = ({
  state,
  setState,
  isAnimating,
  setIsAnimating,
  type,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    isVisible && (
      <div className="windowBlur">
        <div className={`modal ${state ? "open" : ""} `}>
          <div className="titleModal">Кастомизация</div>
          <div className="contentModal"></div>
          <div className="buttonCloseModal" onClick={closeModal}>
            Закрыть
          </div>
        </div>
      </div>
    )
  );
};

export default ModalProfile;
