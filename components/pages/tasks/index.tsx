import React, { useState } from "react";
import LimitedCalender from "../../library/limitedCalender";
import TaskList from "../../library/taskList";
import CategoryForm from "../../library/taskList/categoryForm";
import ProgressBar, {
  ProgressBarDataType,
} from "../../library/charts/progressBar";
import _ from "lodash";
import { CategoryModel } from "../../../types/category";
import { getUTCDayRange } from "../../../utils/dateComputer";
import { useQueries } from "@tanstack/react-query";
import { IconColors, TaskModel } from "../../../types/task";
import taskService from "../../../utils/services/task";
import { useTaskProgressBar } from "../../../utils/hooks/query/task/useTaskProgressBar";

const styles = require("./tasks.module.scss");

type TasksViewProps = {
  categories: CategoryModel[];
};

const TasksView: React.FC<TasksViewProps> = ({ categories }) => {
  const { startTime } = getUTCDayRange(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(startTime));
  const progressBarData = useTaskProgressBar(categories, selectedDate);

  // console.log(progressBarData);

  return (
    <>
      <LimitedCalender
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {categories ? (
        <>
          {progressBarData && <ProgressBar chartData={progressBarData} />}
          {categories.map((category) => {
            return (
              <TaskList
                key={category.id}
                selectedDate={selectedDate}
                category={category}
              />
            );
          })}
        </>
      ) : (
        <p>todo add looks like you have no categories section</p>
      )}
      <CategoryForm />
    </>
  );
};

export default TasksView;
