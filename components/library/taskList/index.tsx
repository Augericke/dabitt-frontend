import React from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { TaskModel } from "../../../types/task";
import { CategoryModel } from "../../../types/category";
import { useTask } from "../../../utils/hooks/query/task/useTask";
import TaskListSkeleton from "./skeleton";

const styles = require("./taskList.module.scss");

type TaskListProps = {
  selectedDate: Date;
  category: CategoryModel;
};

const TaskList: React.FC<TaskListProps> = ({ selectedDate, category }) => {
  const tasks = useTask(category.id, selectedDate);

  return (
    <>
      {tasks.isLoading ? (
        <TaskListSkeleton />
      ) : tasks.error ? (
        <p>looks like something went wrong</p>
      ) : (
        <section className={styles.categoryContainer}>
          <CategoryHeader
            category={category}
            numTasks={tasks.data ? tasks.data.length : 0}
          />
          <div className={styles.taskListContainer}>
            <ul className={styles.taskList}>
              {tasks && (
                <>
                  {tasks.data
                    .sort((a, b) => {
                      const aCompleted = a.completedAt ? 1 : -1;
                      const bCompleted = b.completedAt ? 1 : -1;
                      return bCompleted - aCompleted;
                    })
                    .map((task: TaskModel) => {
                      return (
                        <TaskItem
                          key={task.id}
                          selectedDate={selectedDate}
                          category={category}
                          task={task}
                        />
                      );
                    })}
                </>
              )}
              <li>
                <TaskForm category={category} selectedDate={selectedDate} />
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default TaskList;
