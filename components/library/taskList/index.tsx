/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Dispatch, SetStateAction, useState } from "react";
import CategoryHeader from "./categoryHeader";
import TaskItem from "./taskItem";
import TaskForm from "./taskForm";
import { CategoryModel, IconColors, TaskModel } from "../../../types/task";

const styles = require("./taskList.module.scss");

type TaskListProps = {
  category: CategoryModel;
  categoryId: string;
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
};

const TaskList: React.FC<TaskListProps> = ({
  category,
  categoryId,
  categories,
  setCategories,
}) => {
  const [tasks, setTasks] = useState(category.tasks);
  const [categoryColor, setCategoryColor] = useState<IconColors>(
    category.iconColor,
  );
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
          {tasks.map((task: TaskModel) => {
            return (
              <TaskItem
                key={task.id}
                category={category}
                setCategories={setCategories}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                categoryColor={categoryColor}
              />
            );
          })}
          <li>
            <TaskForm
              category={category}
              tasks={tasks}
              setTasks={setTasks}
              categoryColor={categoryColor}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TaskList;
