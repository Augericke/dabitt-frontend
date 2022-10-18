import React, { useState } from "react";
import CalenderMap from "../../library/charts/calendarMap";
import { motion } from "framer-motion";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {};

const DashboardView: React.FC<DashboardViewProps> = (
  props: DashboardViewProps,
) => {
  const categoryList = [
    { name: "all", id: "a" },
    { name: "hobbies", id: "b" },
    { name: "work", id: "c" },
    { name: "personal", id: "d" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(
    categoryList[0]["id"],
  );

  return (
    <div className={styles.placeHolderContainer}>
      <div className={styles.categoriesContainer}>
        {categoryList.map((category) => {
          const isSelected = category.id === selectedCategory;
          return (
            <div
              className={styles.categoryContainer}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span
                className={
                  isSelected ? styles.categoryTextSelected : styles.categoryText
                }
              >
                {category.name}
              </span>
              {isSelected && (
                <motion.span
                  className={styles.categoryUnderline}
                  layoutId="category-select"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.calenderContainer}>
        <CalenderMap />
      </div>
    </div>
  );
};

export default DashboardView;
