/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { CategoryModel, IconColors, TaskModel } from "../../../types/task";
import produce from "immer";

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
  const [tasks, testTasks] = useState<TaskModel[]>();

  useEffect(() => {
    if (categories) {
      testTasks(categories?.find((cat) => cat.id === category.id)?.tasks);
    }
  }, [categories, category.id]);

  return (
    <section className={styles.categoryContainer}>
      <CategoryHeader
        category={category}
        categories={categories}
        setCategories={setCategories}
      />
      <div className={styles.taskListContainer}>
        <ul className={styles.taskList}>
          {tasks && (
            <>
              {tasks.map((task: TaskModel) => {
                return (
                  <TaskItem
                    key={task.id}
                    category={category}
                    task={task}
                    categories={categories}
                    setCategories={setCategories}
                  />
                );
              })}
            </>
          )}
          <li>
            <TaskForm category={category} setCategories={setCategories} />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TaskList;
