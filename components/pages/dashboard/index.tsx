import React, { useState } from "react";
import CalenderMap from "../../library/charts/calendarMap";
import { motion } from "framer-motion";
import { getSelectableColorClass } from "../../../utils/selectableColorClass";
import { CategoryModel } from "../../../types/category";
import { IconColors } from "../../../types/task";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {
  categories: CategoryModel[];
};

const DashboardView: React.FC<DashboardViewProps> = ({ categories }) => {
  const categoryList = [
    {
      id: "",
      name: "all",
      iconColor: "default" as IconColors,
    },
    ...categories,
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
  const { backgroundColor } = getSelectableColorClass(
    styles,
    selectedCategory.iconColor,
  );

  return (
    <div className={styles.placeHolderContainer}>
      <div className={styles.categoriesContainer}>
        {categoryList.map((category) => {
          const isSelected = category.id === selectedCategory.id;
          return (
            <div
              className={styles.categoryContainer}
              key={category.id}
              onClick={() => setSelectedCategory(category)}
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
                  className={`${styles.categoryUnderline} ${backgroundColor}`}
                  layoutId="category-select"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.calenderContainer}>
        <CalenderMap color={selectedCategory.iconColor} />
      </div>
    </div>
  );
};

export default DashboardView;
