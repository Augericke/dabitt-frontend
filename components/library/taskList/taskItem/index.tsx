/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  isCompleted: boolean;
  description: string;
};

const TaskItem: React.FC<TaskItemProps> = ({ description, isCompleted }) => {
  return (
    <li className={styles.taskItem}>
      <span className={styles.taskStatusIcon} />
      <b className={styles.taskDescription}>{description}</b>
    </li>
  );
};

export default TaskItem;
