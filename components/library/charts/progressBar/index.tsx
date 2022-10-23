import React, { useState } from "react";
import { IconColors } from "../../../../types/task";
import Bar from "./bar";
import { motion, AnimatePresence } from "framer-motion";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { displayHourMinutes } from "../../../../utils/dateComputer";
import { CategoryModel } from "../../../../types/category";

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
  categories: CategoryModel[];
};

const ProgressBar: React.FC<ProgressBarProps> = ({ chartData, categories }) => {
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
            {chartData && (
              <ProgressBarSummary
                chartData={chartData}
                categories={categories}
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
  categories: CategoryModel[];
};

const ProgressBarSummary: React.FC<ProgressBarSummaryProps> = ({
  chartData,
  categories,
}) => {
  return (
    <ul className={styles.toolList}>
      <li className={styles.listItemHeader}>
        <span className={styles.categoryName} />
        <span className={styles.categoryHeader}>completed</span>
        <span className={styles.categoryHeader}>remaining</span>
      </li>
      {categories.map((category) => {
        const { backgroundColor } = getSelectableColorClass(
          styles,
          category.iconColor,
        );
        return (
          <li key={category.id} className={styles.listItem}>
            <span className={styles.categoryName}>
              <div className={`${styles.categoryIcon} ${backgroundColor}`} />
              {category.name}
            </span>
            <motion.span className={styles.categoryValue}>
              {displayHourMinutes(
                chartData.find(
                  (cat) => cat.categoryId === category.id && cat.completed,
                )?.minutes || 0,
              )}
            </motion.span>
            <motion.span className={styles.categoryValue}>
              {displayHourMinutes(
                chartData.find(
                  (cat) => cat.categoryId === category.id && !cat.completed,
                )?.minutes || 0,
              )}
            </motion.span>
          </li>
        );
      })}
    </ul>
  );
};

export default ProgressBar;
