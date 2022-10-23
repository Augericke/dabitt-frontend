import React, { useState } from "react";
import { IconColors } from "../../../../types/task";
import Bar from "./bar";
import { motion, AnimatePresence } from "framer-motion";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { displayHourMinutes } from "../../../../utils/dateComputer";

const styles = require("./progressBar.module.scss");

export type ProgressBarDataType = {
  categoryId: string;
  category: string;
  color: IconColors;
  value: number;
  completed: boolean;
  minutes?: number;
};

export type ProgressBarProps = {
  chartData: ProgressBarDataType[];
};

const ProgressBar: React.FC<ProgressBarProps> = ({ chartData }) => {
  const [showInfo, setShowInfo] = useState(false);

  // Convert value into value 1-100
  const totalValue = chartData.reduce((accumulator, data) => {
    return (accumulator as number) + data.value;
  }, 0);

  chartData = chartData.map((data) => {
    return {
      ...data,
      value: Math.ceil((data.value / totalValue) * 100),
      minutes: data.value,
    };
  });

  // Display completed values first
  chartData = chartData.sort(
    (a, b) => Number(b.completed) - Number(a.completed),
  );

  const completedCategory = chartData.filter((category) => category.completed);
  const remainingCategory = chartData.filter((category) => !category.completed);

  return (
    <div className={styles.barInfoContainer}>
      <div
        className={
          chartData.filter((data) => data.value > 0).length
            ? styles.barContainer
            : styles.barContainerEmpty
        }
        onClick={() => setShowInfo(!showInfo)}
      >
        <AnimatePresence>
          {chartData.map((data) => {
            return (
              <Bar data={data} key={`${data.categoryId}-${data.completed}`} />
            );
          })}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showInfo && chartData.length > 0 && (
          <motion.div
            className={styles.tooltipContainer}
            key={"progressbar-tooltip"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.9, delay: 0 }}
          >
            {completedCategory && (
              <ProgressBarSummary
                chartData={completedCategory}
                isCompleted={true}
              />
            )}
            {remainingCategory && (
              <ProgressBarSummary
                chartData={remainingCategory}
                isCompleted={false}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type ProgressBarSummaryProps = {
  chartData: ProgressBarDataType[];
  isCompleted: boolean;
};

const ProgressBarSummary: React.FC<ProgressBarSummaryProps> = ({
  chartData,
  isCompleted,
}) => {
  return (
    <ul className={styles.toolList}>
      <p
        className={
          isCompleted ? styles.categoryHeaderCompleted : styles.categoryHeader
        }
      >
        {isCompleted ? "completed" : "remaining"}
      </p>
      {chartData.map((category) => {
        const { backgroundColor } = getSelectableColorClass(
          styles,
          category.color,
        );
        return (
          <motion.li
            key={`${category.categoryId}-${category.completed}`}
            className={styles.listItem}
            initial={{ y: 3, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 3, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <span className={styles.categoryName}>
              <div className={`${styles.categoryIcon} ${backgroundColor}`} />
              {category.category}
            </span>
            <motion.span className={styles.categoryTime}>
              {displayHourMinutes(category.minutes || 0)}
            </motion.span>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default ProgressBar;
