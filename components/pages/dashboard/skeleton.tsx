import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import colors from "../../../styles/_selectableColors.module.scss";

const styles = require("./dashboard.module.scss");

import "react-loading-skeleton/dist/skeleton.css";

type DashboardSkeletonProps = {};

const DashboardSkeleton: React.FC<DashboardSkeletonProps> = (
  props: DashboardSkeletonProps,
) => {
  return (
    <SkeletonTheme
      baseColor={colors["foreground-color"]}
      highlightColor={colors["icon-color"]}
    >
      <div className={styles.dashboardContainer}>
        <div className={styles.categoriesContainer}>
          <Skeleton width="60px" height="30px" />
          <Skeleton width="60px" height="30px" />
          <Skeleton width="60px" height="30px" />
        </div>
        <div className={styles.barContainer}>
          <Skeleton width="100vw" height="100vh" />
        </div>
        <div className={styles.barContainer}>
          <Skeleton width="100vw" height="100vh" />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default DashboardSkeleton;
