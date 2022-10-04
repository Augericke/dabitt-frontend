import React from "react";
import { displayHourMinutes } from "../../../../../utils/dateComputer";

const styles = require("./timeEstimateMenuOptions.module.scss");

export const getTimeEstimateMenuOptions = (
  handleTimeChange: (newEstimate: number) => void,
) => {
  const menuItems = [15, 30, 60, 120].map((time) => {
    return {
      content: (
        <div className={styles.timeEstimateContainer}>
          <span>{displayHourMinutes(time)}</span>
        </div>
      ),
      onClick: () => handleTimeChange(time),
    };
  });

  return menuItems;
};
