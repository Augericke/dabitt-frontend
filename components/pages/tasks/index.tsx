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
import { TaskModel } from "../../../types/task";

const styles = require("./tasks.module.scss");

type TasksViewProps = {
  categories: CategoryModel[];
};

const TasksView: React.FC<TasksViewProps> = ({ categories }) => {
  const { startTime } = getUTCDayRange(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(startTime));

  const taskQueries = useQueries<TaskModel[]>({
    queries: categories.map((category) => {
      return { queryKey: ["tasks", category.id, selectedDate] };
    }),
  });

  const isLoading = taskQueries.some((query) => query.isLoading);
  const isError = taskQueries.some((query) => query.isError);

  if (isLoading) {
    console.log("loading");
  } else if (isError) {
    console.log("error");
  } else {
    // Combine all task data into a single array
    const queryData = taskQueries
      .map((query) => query.data)
      .flat(1) as TaskModel[];

    const aggregatedQueryData = _(queryData)
      .map((task) => {
        return { ...task, isComplete: task.completedAt !== null };
      })
      .groupBy((task) => {
        return `${task.categoryId}, ${task.isComplete}`;
      })
      .map((task) => ({
        categoryId: _.maxBy(task, "categoryId")?.categoryId,
        isComplete: _.maxBy(task, "isComplete")?.isComplete,
        value: _.sumBy(task, "estimateMinutes"),
      }))
      .value();

    const chartData = aggregatedQueryData.map((item) => ({
      ...categories.find((cat) => cat.id === item.categoryId),
      ...item,
    }));
    console.log(chartData);
  }

  return (
    <>
      <LimitedCalender
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {categories ? (
        <>
          {/* <ProgressBar chartData={chartData} /> */}
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
