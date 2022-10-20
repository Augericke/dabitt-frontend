import React, { useState } from "react";
import CalenderMap from "../../library/charts/calendarMap";
import { motion } from "framer-motion";
import { getSelectableColorClass } from "../../../utils/selectableColorClass";
import { CategoryModel } from "../../../types/category";
import { IconColors } from "../../../types/task";
import BarChart from "../../library/charts/bar";
import { useCalendarCompleted } from "../../../utils/hooks/query/analytics/useCalendarCompleted";
import ShowOnViewport from "../../library/animation/showOnViewport";
import { useWeekCompleted } from "../../../utils/hooks/query/analytics/useWeekCompleted";
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

  const calendarData = useCalendarCompleted(selectedCategory.id);
  const weekData = useWeekCompleted(selectedCategory.id);

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
      <ShowOnViewport customClass={styles.barContainer}>
        {weekData.isLoading ? (
          <></>
        ) : weekData.isError ? (
          <></>
        ) : (
          <BarChart data={weekData.data} categories={categories} />
        )}
      </ShowOnViewport>
      <ShowOnViewport customClass={styles.calenderContainer}>
        {calendarData.isLoading ? (
          <></>
        ) : calendarData.isError ? (
          <></>
        ) : (
          <CalenderMap
            data={calendarData.data}
            categories={
              selectedCategory.id === "" ? categories : [selectedCategory]
            }
            color={selectedCategory.iconColor}
          />
        )}
      </ShowOnViewport>
    </div>
  );
};

export default DashboardView;
