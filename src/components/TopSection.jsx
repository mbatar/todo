import React from "react";

const TopSection = ({ isHeaderOpen, toggleHeader }) => {
  return (
    <div id="top-section">
      <div id="logo">Logo</div>
        <span
          onClick={() => toggleHeader((v) => !v)}
          id="header-toggle"
          className="material-icons-outlined"
        >
            {isHeaderOpen ? 'close' : 'menu' }
        </span>
    </div>
  );
};

export default TopSection;
