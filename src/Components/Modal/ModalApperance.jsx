import React from 'react';
import { cat, ghost, heart, magicStick } from '../NavBar/svg';
import { useEffect, useRef, useState } from 'react';

const ModalApperance = ({
  state,
  setState,
  isAnimating,
  setIsAnimating,
  type,
}) => {
  const [activeColor, setActiveColor] = useState(
    localStorage.getItem('accent_color')
  );
  const [activeTheme, setActiveTheme] = useState(localStorage.getItem('theme'));
  const [activeIcon, setActiveIcon] = useState(localStorage.getItem('icon'));
  const [isVisible, setIsVisible] = useState(false);

  const accentColor = useRef(null);
  const themeColor = useRef(null);
  const changeColor = ({ typeColor, color }) => {
    const accent_color = localStorage.getItem('accent_color');

    document.querySelector('body').classList.add(typeColor);

    if (accent_color !== typeColor) {
      document.querySelector('body').classList.remove(accent_color);
      document.querySelector('body').classList.add(typeColor);
    }

    const colorElement = accentColor.current.querySelector(`.${typeColor}`);
    colorElement.classList.add('active');
    colorElement.style.outline = `2px solid ${color}`;

    const allColors = accentColor.current.querySelectorAll('.color');

    localStorage.setItem('accent_color', typeColor);

    allColors.forEach((el) => {
      if (
        el.classList.contains('active') &&
        el.className !== colorElement.className
      ) {
        el.classList.remove('active');
        el.style.outline = '';
      }
    });
  };
  const changeTheme = ({ typeTheme, color }) => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === typeTheme) return;
    setActiveTheme(typeTheme);
    const themeElement = themeColor.current.querySelector(
      `.previewTheme.${typeTheme}`
    );
    themeElement.classList.add('active');
    themeElement.style.transition = 'outline 0.1s ease';

    const allThemes = themeColor.current.querySelectorAll('.previewTheme');

    localStorage.setItem('theme', typeTheme);
    document.querySelector('body').classList.add(typeTheme);
    document.querySelector('body').classList.remove(currentTheme);

    allThemes.forEach((el) => {
      if (el.classList.contains('active') && el !== themeElement) {
        el.classList.remove('active');
        el.style.outline = '';
        el.style.transition = 'outline 0.3s ease';
      }
    });
  };

  const closeModal = () => {
    setState(false);
  };

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

  const changeIcon = ({ typeIcon }) => {
    const currentIcon = localStorage.setItem('icon', typeIcon);
    localStorage.setItem('icon', typeIcon);
    const iconElement = document.querySelector(`.${typeIcon}`);
    iconElement.classList.add('active');
    iconElement.style.transition = 'outline 0.1s ease';
    setActiveIcon(typeIcon);

    const listTypeIcon = {
      cat: cat(),
      ghost: ghost(),
      heart: heart(),
      magicStick: magicStick(),
    };

    const allIcons = document.querySelectorAll('.designIcon ');

    allIcons.forEach((el) => {
      if (el.classList.contains('active') && el !== iconElement) {
        el.classList.remove('active');
        el.style.outline = '';
        el.style.transition = 'outline 0.3s ease';
      }
    });
  };

  return (
    isVisible && (
      <div className="windowBlur">
        <div className={`modal ${state ? 'open' : ''} `}>
          <div className="titleModal">Кастомизация</div>
          <div className="contentModal">
            <div className="titleContent">
              <h4>Тема приложения</h4>
              <div className="line"></div>
              <div className="choiceThemes" ref={themeColor}>
                {['light', 'dark'].map((theme) => (
                  <div key={theme} className="theme">
                    <div
                      className={`previewTheme ${theme} ${
                        theme === `${activeTheme}` ? 'active' : ''
                      }`}
                      onClick={() =>
                        changeTheme({
                          typeTheme: theme,
                          color: theme === 'light' ? '#fff' : '#000',
                        })
                      }
                    >
                      <div className="window">
                        <p>Aa</p>
                      </div>
                    </div>
                    <p className="nameTheme">
                      {theme === 'light' ? 'Светлая' : 'Темная'}
                    </p>
                  </div>
                ))}
              </div>
              <h4>Цветовая схема</h4>
              <div className="line"></div>
              <div className="choiceColors" ref={accentColor}>
                {[
                  { color: 'green', hex: '#00913c' },
                  { color: 'default', hex: '#3173a5' },
                  { color: 'blue', hex: '#3453db' },
                  { color: 'purple', hex: '#8e44ad' },
                  { color: 'pink', hex: '#c042b6' },
                  { color: 'red', hex: '#e74c3c' },
                  { color: 'orange', hex: '#f39c12' },
                  { color: 'yellow', hex: '#f1c40f' },
                ].map((item) => (
                  <div
                    key={item.color}
                    className={`color ${item.color} ${
                      item.color === activeColor ? 'active' : ''
                    }`}
                    style={
                      (item.color === activeColor
                        ? { outline: `2px solid ${item.hex}` }
                        : {},
                      { backgroundColor: item.hex })
                    }
                    onClick={() =>
                      changeColor({ typeColor: item.color, color: item.hex })
                    }
                  ></div>
                ))}
              </div>
              <h4>Дизайн профиля</h4>
              <div className="line"></div>
              <div className="choiceDesign">
                {['cat', 'ghost', 'heart', 'magicStick'].map((icon) => (
                  <div
                    key={icon}
                    onClick={() => changeIcon({ typeIcon: icon })}
                    className={`designIcon ${icon} ${
                      icon === `${activeIcon}` ? 'active' : ''
                    }`}
                  >
                    {eval(icon)()}
                  </div>
                ))}
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

export default ModalApperance;
