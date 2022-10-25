import React from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { TaskModel } from "../../../types/task";
import { CategoryModel } from "../../../types/category";
import { useTask } from "../../../utils/hooks/query/task/useTask";
import { AnimatePresence } from "framer-motion";
import TaskListSkeleton from "./skeleton";
import ShowOnViewport from "../animation/showOnViewport";
import ErrorView from "../error";

const styles = require("./taskList.module.scss");

type TaskListProps = {
  selectedDate: Date;
  category: CategoryModel;
  modifiable?: boolean;
};

const TaskList: React.FC<TaskListProps> = ({
  selectedDate,
  category,
  modifiable = true,
}) => {
  const tasks = useTask(category.id, selectedDate);
  const numTasks = tasks.data ? tasks.data.length : 0;

  return (
    <>
      {tasks.isLoading ? (
        <TaskListSkeleton />
      ) : tasks.isError ? (
        <section className={styles.categoryContainer}>
          <CategoryHeader category={category} numTasks={numTasks} />
          {(modifiable || numTasks > 0) && (
            <ShowOnViewport customClass={styles.taskListContainer}>
              <>
                <ul className={styles.taskList}>
                  We ran into an issue loading these tasks...
                </ul>
              </>
            </ShowOnViewport>
          )}
        </section>
      ) : (
        <>
          <section className={styles.categoryContainer}>
            <CategoryHeader category={category} numTasks={numTasks} />
            {(modifiable || numTasks > 0) && (
              <ShowOnViewport customClass={styles.taskListContainer}>
                <>
                  <ul className={styles.taskList}>
                    {tasks && (
                      <AnimatePresence>
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
                      </AnimatePresence>
                    )}
                    {modifiable && (
                      <li>
                        <TaskForm
                          category={category}
                          selectedDate={selectedDate}
                        />
                      </li>
                    )}
                  </ul>
                </>
              </ShowOnViewport>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default TaskList;
