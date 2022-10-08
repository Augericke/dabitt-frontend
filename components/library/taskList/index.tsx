import React, { useEffect, useState } from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { TaskModel } from "../../../types/task";
import { CategoryModel } from "../../../types/category";
import { useTask } from "../../../utils/hooks/query/useTasks";

const styles = require("./taskList.module.scss");

type TaskListProps = {
  selectedDate: Date;
  category: CategoryModel;
};

const TaskList: React.FC<TaskListProps> = ({ selectedDate, category }) => {
  const [tasks, setTasks] = useState<TaskModel[]>();

  const taskArray = useTask(category.id);
  useEffect(() => {
    if (taskArray.data) {
      setTasks(taskArray.data);
    }
  }, [taskArray]);

  return (
    <section className={styles.categoryContainer}>
      <CategoryHeader category={category} numTasks={tasks ? tasks.length : 0} />
      <div className={styles.taskListContainer}>
        <ul className={styles.taskList}>
          {tasks && (
            <>
              {tasks.map((task: TaskModel) => {
                return (
                  <TaskItem key={task.id} category={category} task={task} />
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
  );
};

export default TaskList;
