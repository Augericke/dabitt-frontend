import React from "react";
import { displayHourMinutes } from "../../../../../utils/dateComputer";

export const getTimeEstimateMenuOptions = (
  setEstimate: React.Dispatch<React.SetStateAction<number>>,
) => {
  const menuItems = [15, 30, 60, 120].map((time) => {
    return {
      content: <span>{displayHourMinutes(time)}</span>,
      onClick: () => setEstimate(time),
    };
  });

  return menuItems;
};
