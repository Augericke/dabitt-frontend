import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import LimitedCalender from "../../library/limitedCalender";
import TaskList from "../../library/taskList";
import CategoryForm from "../../library/taskList/categoryForm";
import { CategoryModel } from "../../../types/task";
import { getYesterdayTodayTomorrow } from "../../../utils/dateComputer";
import ProgressBar, {
  ProgressBarDataType,
} from "../../library/charts/progressBar";
import _ from "lodash";

const styles = require("./tasks.module.scss");

type TasksViewProps = {
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
};

const TasksView: React.FC<TasksViewProps> = ({ categories, setCategories }) => {
  const dates = getYesterdayTodayTomorrow();
  const [selectedDate, setSelectedDate] = useState(dates.today.date);
  const [chartData, setChartData] = useState<ProgressBarDataType[]>([]);

  useEffect(() => {
    if (categories) {
      const completed = _.chain(categories)
        .map((category) => ({
          category: category.name,
          color: category.iconColor,
          value: _.sumBy(category.tasks, (task) => {
            return task.completedAt ? task.estimateMinutes : 0;
          }),
          completed: true,
        }))
        .value();

      const unfinished = _.chain(categories)
        .map((category) => ({
          category: category.name,
          color: category.iconColor,
          value: _.sumBy(category.tasks, (task) => {
            return task.completedAt ? 0 : task.estimateMinutes;
          }),
          completed: false,
        }))
        .value();

      setChartData([...completed, ...unfinished]);
    }
  }, [categories]);

  return (
    <div className={styles.placeHolderContainer}>
      <LimitedCalender
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {categories ? (
        <>
          <ProgressBar chartData={chartData} />
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

export default TasksView;
