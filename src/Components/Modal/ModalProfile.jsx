import React, { useEffect, useState } from 'react';

const ModalProfile = ({
  state,
  setState,
  isAnimating,
  setIsAnimating,
  type,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (state) {
      setIsVisible(true);
      setState(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'auto';
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [state]);

  const closeModal = () => {
    setState(false);
  };

  return (
    isVisible && (
      <div className="windowBlur">
        <div className={`modal ${state ? 'open' : ''} `}>
          <div className="titleModal">Профиль</div>
          <div className="contentModal">
            <div className="titleContent">
              <h4>ФИО</h4>
              <div className="line"></div>
              <div className="infoUser">
                <p>Гончаренко Сергей Владимирович</p>
              </div>
            </div>
          </div>
          <div className="buttonCloseModal" onClick={closeModal}>
            Закрыть
          </div>
        </div>
      </div>
    )
  );
};

export default ModalProfile;
