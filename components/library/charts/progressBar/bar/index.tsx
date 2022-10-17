import React, { useEffect } from "react";
import { ProgressBarDataType } from "..";
import { getSelectableColorClass } from "../../../../../utils/selectableColorClass";
import { motion, AnimatePresence } from "framer-motion";

const styles = require("./bar.module.scss");

type BarType = {
  data: ProgressBarDataType;
};

const Bar: React.FC<BarType> = ({ data }) => {
  const { category, categoryId, value, color, completed } = data;

  const { backgroundColor } = getSelectableColorClass(styles, color);
  const barId = `${categoryId}-${completed ? "completed" : "remaining"}`;

  useEffect(() => {
    const bar = document.getElementById(barId);
    if (bar) {
      bar.style.width = `${value}%`;
    }
  }, [barId, value]);

  return (
    <motion.span
      id={barId}
      key={barId}
      className={`${
        completed ? styles.barCategoryCompleted : styles.barCategory
      } ${backgroundColor}`}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      exit={{ width: 0, opacity: 0.2 }}
      transition={{ duration: 0.9, delay: 0 }}
    />
  );
};

export default Bar;
