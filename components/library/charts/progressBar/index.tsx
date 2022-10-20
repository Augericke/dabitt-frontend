import React from "react";
import { IconColors } from "../../../../types/task";
import Bar from "./bar";
import { AnimatePresence } from "framer-motion";

const styles = require("./progressBar.module.scss");

export type ProgressBarDataType = {
  categoryId: string;
  category: string;
  color: IconColors;
  value: number;
  completed: boolean;
};

export type ProgressBarProps = {
  chartData: ProgressBarDataType[];
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

  return (
    <div
      className={
        chartData.filter((data) => data.value > 0).length
          ? styles.barContainer
          : styles.barContainerEmpty
      }
    >
      <AnimatePresence>
        {chartData.map((data) => {
          return (
            <Bar data={data} key={`${data.categoryId}-${data.completed}`} />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ProgressBar;
