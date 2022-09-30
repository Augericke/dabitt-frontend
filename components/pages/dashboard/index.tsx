import React, { SetStateAction, Dispatch, useState } from "react";
import LimitedCalender from "../../library/limitedCalender";
import TaskList from "../../library/taskList";
import CategoryForm from "../../library/categoryForm";
import { CategoryModel } from "../../../types/task";
import { getYesterdayTodayTomorrow } from "../../../utils/dateComputer";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
};

const DashboardView: React.FC<DashboardViewProps> = ({
  categories,
  setCategories,
}) => {
  const dates = getYesterdayTodayTomorrow();
  const [selectedDate, setSelectedDate] = useState(dates.today.date);

  return (
    <div className={styles.placeHolderContainer}>
      <LimitedCalender
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {categories ? (
        <>
          {categories.map((category) => {
            return (
              <TaskList
                key={category.id}
                category={category}
                categories={categories}
                setCategories={setCategories}
              />
            );
          })}
        </>
      ) : (
        <p>todo add looks like you have no categories section</p>
      )}
      <CategoryForm categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default DashboardView;
