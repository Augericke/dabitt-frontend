import React from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { TaskModel } from "../../../types/task";
import { CategoryModel } from "../../../types/category";
import { useTask } from "../../../utils/hooks/query/useTask";

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
        <p>todo add skelton & error handling</p>
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
                  {tasks.data.map((task: TaskModel) => {
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
