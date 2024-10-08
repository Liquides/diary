import React from 'react';
import '../../assets/styles/preloaders.scss';

const PreloadersDiary = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key, index) => (
        <div className="schoolSubject preload" key={index}>
          <div className="topMark preload">
            <div className="left preload">
              <div className="svg-mark preload"></div>
              <p className="iconSubject preload"></p>
            </div>
            <div className="right preload">
              <p></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const PreloadersDays = () => {
  return (
    <div class="days">
      <div class="day preloader">
        <div class="title">
          <div class="preload-text"></div>
        </div>
        <div class="callsList">
          <div class="object">
            <div class="call preloader">
              <div class="timer preload"></div>
              <div class="left">
                <div class="id preload"></div>
                <div class="nameObject preload"></div>
                <div class="timeToCall preload"></div>
              </div>
              <div class="right">
                <div class="timerNumber preload"></div>
              </div>
            </div>
            <div class="dotPoint preload"></div>
          </div>
          <div class="object">
            <div class="call preloader">
              <div class="left">
                <div class="id preload"></div>
                <div class="nameObject preload"></div>
                <div class="timeToCall preload"></div>
              </div>
            </div>
            <div class="dotPoint preload"></div>
          </div>
          <div class="object">
            <div class="call preloader">
              <div class="left">
                <div class="id preload"></div>
                <div class="nameObject preload"></div>
                <div class="timeToCall preload"></div>
              </div>
            </div>
            <div class="dotPoint preload"></div>
          </div>
        </div>
      </div>
      <div class="buttonsChangeDay">
        <button class="preloader"></button>
        <button class="preloader"></button>
      </div>
    </div>
  );
};

export { PreloadersDiary, PreloadersDays };
