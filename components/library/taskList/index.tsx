/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { CategoryModel, TaskModel } from "../../../types/task";

const styles = require("./taskList.module.scss");

type TaskListProps = {
  selectedDate: Date;
  category: CategoryModel;
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
};

const TaskList: React.FC<TaskListProps> = ({
  selectedDate,
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

  console.log(selectedDate);
  return (
    <section className={styles.categoryContainer}>
      <CategoryHeader selectedDate={selectedDate} category={category} />
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
            <TaskForm category={category} selectedDate={selectedDate} />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TaskList;
