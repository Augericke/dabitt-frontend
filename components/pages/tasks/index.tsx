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

const styles = require("./tasks.module.scss");

type TasksViewProps = {
  categories: CategoryModel[] | null;
};

const TasksView: React.FC<TasksViewProps> = ({ categories }) => {
  const { startTime } = getUTCDayRange(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(startTime));

  // const [chartData, setChartData] = useState<ProgressBarDataType[]>([]);

  // useEffect(() => {
  //   if (categories) {
  //     const completed = _.chain(categories)
  //       .map((category) => ({
  //         category: category.name,
  //         color: category.iconColor,
  //         value: _.sumBy(category.tasks, (task) => {
  //           return task.completedAt ? task.estimateMinutes : 0;
  //         }),
  //         completed: true,
  //       }))
  //       .value();

  //     const unfinished = _.chain(categories)
  //       .map((category) => ({
  //         category: category.name,
  //         color: category.iconColor,
  //         value: _.sumBy(category.tasks, (task) => {
  //           return task.completedAt ? 0 : task.estimateMinutes;
  //         }),
  //         completed: false,
  //       }))
  //       .value();

  //     setChartData([...completed, ...unfinished]);
  //   }
  // }, [categories]);

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
