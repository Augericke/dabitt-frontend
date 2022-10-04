import React from "react";
import { IconColors } from "../../../../types/task";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";

const styles = require("./progressBar.module.scss");
type ProgressBarProps = {
  chartData: ProgressBarDataType[];
};

export type ProgressBarDataType = {
  category: string;
  color: IconColors;
  value: number;
  completed: boolean;
};
const ProgressBar: React.FC<ProgressBarProps> = ({ chartData }) => {
  // Convert value into value 1-100
  const totalValue = chartData.reduce((accumulator, data) => {
    return (accumulator as number) + data.value;
  }, 0);

  chartData = chartData.map((data) => {
    return { ...data, value: Math.ceil((data.value / totalValue) * 100) };
  });

  // Display completed values first
  chartData = chartData.sort(
    (a, b) => Number(b.completed) - Number(a.completed),
  );

  //TODO: add tooltip
  return (
    <div className={styles.barContainer}>
      {chartData.map((data, index) => {
        const { backgroundColor } = getSelectableColorClass(styles, data.color);

        const barId = `${data.category}-${index}`;
        const bar = document.getElementById(barId);
        if (bar) {
          bar.style.width = `${data.value}%`;
        }

        return (
          <span
            id={barId}
            key={index}
            className={`${
              data.completed ? styles.barCategoryCompleted : styles.barCategory
            } ${backgroundColor}`}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
