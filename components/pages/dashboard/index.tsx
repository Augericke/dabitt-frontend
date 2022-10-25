import React, { useState } from "react";
import CalenderMap from "../../library/charts/calendarMap";
import { motion } from "framer-motion";
import { getSelectableColorClass } from "../../../utils/selectableColorClass";
import { CategoryModel } from "../../../types/category";
import { IconColors } from "../../../types/task";
import colors from "../../../styles/_selectableColors.module.scss";
import BarChart from "../../library/charts/bar";
import { useCalendarCompleted } from "../../../utils/hooks/query/analytics/useCalendarCompleted";
import ShowOnViewport from "../../library/animation/showOnViewport";
import { useWeekCompleted } from "../../../utils/hooks/query/analytics/useWeekCompleted";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorView from "../../library/error";

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
  const weekData = useWeekCompleted();

  return (
    <div className={styles.dashboardContainer}>
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
          <SkeletonTheme
            baseColor={colors["foreground-color"]}
            highlightColor={colors["icon-color"]}
          >
            <Skeleton width="100vw" height="100vh" />
          </SkeletonTheme>
        ) : weekData.isError ? (
          <ErrorView showBorder={false} />
        ) : (
          <BarChart
            data={weekData.data}
            categories={categories}
            selectedCategory={
              selectedCategory.id === "" ? undefined : selectedCategory
            }
          />
        )}
      </ShowOnViewport>
      <ShowOnViewport customClass={styles.calenderContainer}>
        {calendarData.isLoading ? (
          <SkeletonTheme
            baseColor={colors["foreground-color"]}
            highlightColor={colors["icon-color"]}
          >
            <div className={styles.calenderSkelton}>
              <Skeleton width="100vw" height="100vh" />
            </div>
          </SkeletonTheme>
        ) : calendarData.isError ? (
          <ErrorView
            title={"There was an issue with loading your calendar"}
            showBody={false}
            showBorder={false}
          />
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
