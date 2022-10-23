import React, { useState } from "react";
import LimitedCalender from "../../library/limitedCalender";
import TaskList from "../../library/taskList";
import CategoryForm from "../../library/taskList/categoryForm";
import ProgressBar from "../../library/charts/progressBar";
import { CategoryModel } from "../../../types/category";
import {
  getIsCurrent,
  getIsFuture,
  getUTCDayRange,
} from "../../../utils/dateComputer";
import { useTaskProgressBar } from "../../../utils/hooks/query/task/useTaskProgressBar";

const styles = require("./tasks.module.scss");

type TasksViewProps = {
  categories: CategoryModel[];
};

const TasksView: React.FC<TasksViewProps> = ({ categories }) => {
  const { startTime } = getUTCDayRange(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(startTime));
  const progressBarData = useTaskProgressBar(categories, selectedDate);

  return (
    <>
      <LimitedCalender
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {categories.length > 0 && (
        <>
          {progressBarData && <ProgressBar chartData={progressBarData} />}
          {categories.map((category) => {
            const isModifiable =
              getIsCurrent(selectedDate) || getIsFuture(selectedDate);
            return (
              <TaskList
                key={category.id}
                selectedDate={selectedDate}
                category={category}
                modifiable={isModifiable}
              />
            );
          })}
        </>
      )}
      <CategoryForm />
    </>
  );
};

export default TasksView;
