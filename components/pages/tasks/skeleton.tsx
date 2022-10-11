import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import colors from "../../../styles/_selectableColors.module.scss";

const styles = require("../user/user.module.scss");

import "react-loading-skeleton/dist/skeleton.css";

type UserSkeletonProps = {};

const TasksSkeleton: React.FC<UserSkeletonProps> = (
  props: UserSkeletonProps,
) => {
  return (
    <SkeletonTheme
      baseColor={colors["foreground-color"]}
      highlightColor={colors["icon-color"]}
    >
      <div className={styles.userViewContainer}>
        <h1 className={styles.settingsTitle}>
          <Skeleton width="40%" height="100%" />
        </h1>
        <Skeleton width="100%" height="30vh" />
      </div>
      <div className={styles.userViewContainer}>
        <h1 className={styles.settingsTitle}>
          <Skeleton width="40%" height="100%" />
        </h1>
        <Skeleton width="100%" height="30vh" />
      </div>
    </SkeletonTheme>
  );
};

export default TasksSkeleton;
