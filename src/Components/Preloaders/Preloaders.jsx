import React from "react";
import "../../assets/styles/preloaders.scss";

const Preloaders = () => {
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

export default Preloaders;
