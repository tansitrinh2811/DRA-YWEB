import React from "react";

//INTERNAL IMPORT
import Style from "./SwToggle.module.css";
const SwToggle = ({ label }) => {
  return (
    <div className={Style.SwToggle}>
      <div className={Style.SwToggle_change_wrap}>
        <input
          type="checkbox"
          className={Style.SwToggle_checkbox}
          name={label}
          id={label}
        />
        <label className={Style.SwToggle_label} htmlFor={label}>
          <span className={Style.SwToggle_inner} />
          <span className={Style.SwToggle_change} />
        </label>
      </div>
    </div>
  );
};

export default SwToggle;
