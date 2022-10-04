import React from "react";
import { displayHourMinutes } from "../../../../../utils/dateComputer";

export const getTimeEstimateMenuOptions = (
  handleTimeChange: (newEstimate: number) => void,
) => {
  const menuItems = [15, 30, 60, 120].map((time) => {
    return {
      content: <span>{displayHourMinutes(time)}</span>,
      onClick: () => handleTimeChange(time),
    };
  });

  return menuItems;
};
