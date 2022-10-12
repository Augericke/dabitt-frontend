import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import colors from "../../../styles/_selectableColors.module.scss";

const styles = require("./taskList.module.scss");

import "react-loading-skeleton/dist/skeleton.css";

type TaskListSkeletonProps = {};

const TaskListSkeleton: React.FC<TaskListSkeletonProps> = (
  props: TaskListSkeletonProps,
) => {
  return (
    <SkeletonTheme
      baseColor={colors["foreground-color"]}
      highlightColor={colors["icon-color"]}
    >
      <section className={styles.categoryContainer}>
        <div className={styles.categoryHeaderContainer}>
          <hgroup className={styles.categoryTitleContainer}>
            <Skeleton width="30%" height="100%" />
          </hgroup>
        </div>
        <div className={styles.taskListContainer}>
          <ul className={styles.taskList}>
            <li>
              <Skeleton width="100%" height="5vh" />
            </li>

            <li>
              <Skeleton width="100%" height="5vh" />
            </li>

            <li>
              <Skeleton width="100%" height="5vh" />
            </li>
          </ul>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default TaskListSkeleton;
