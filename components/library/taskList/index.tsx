/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Dispatch, SetStateAction, useState } from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { CategoryModel, TaskModel } from "../../../types/task";

const styles = require("./taskList.module.scss");

type TaskListProps = {
  category: CategoryModel;
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
};

const TaskList: React.FC<TaskListProps> = ({
  category,
  categories,
  setCategories,
}) => {
  const [tasks, setTasks] = useState(category.tasks);

  return (
    <section className={styles.categoryContainer}>
      <CategoryHeader
        category={category}
        categories={categories}
        setCategories={setCategories}
        count={tasks.length}
      />
      <div className={styles.taskListContainer}>
        <ul className={styles.taskList}>
          {tasks.map((task: TaskModel, index: number) => {
            return (
              <TaskItem
                key={index}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
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
