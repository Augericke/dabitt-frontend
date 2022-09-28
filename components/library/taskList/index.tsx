/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel, TaskModel } from "../../../types/task";

const styles = require("./taskList.module.scss");

type TaskListProps = {
  category: CategoryModel;
};

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  const [tasks, setTasks] = useState(category.tasks);

  return (
    <section className={styles.categoryContainer}>
      <CategoryHeader name={category.name} count={tasks.length} />
      <div className={styles.taskListContainer}>
        <ul className={styles.taskList}>
          {tasks.map((task: TaskModel, index: number) => {
            return <TaskItem key={index} task={task} />;
          })}
          <li>
            <TaskForm category={category} tasks={tasks} setTasks={setTasks} />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TaskList;
