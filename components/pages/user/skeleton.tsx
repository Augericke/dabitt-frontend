import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import colors from "../../../styles/_selectableColors.module.scss";

const styles = require("./user.module.scss");

import "react-loading-skeleton/dist/skeleton.css";

type UserSkeletonProps = {};

const UserSkeleton: React.FC<UserSkeletonProps> = (
  props: UserSkeletonProps,
) => {
  return (
    <SkeletonTheme
      baseColor={colors["foreground-color"]}
      highlightColor={colors["icon-color"]}
    >
      <section className={styles.userViewContainer}>
        <h1 className={styles.settingsTitle}>
          <Skeleton width="40%" height="100%" />
        </h1>
        <Skeleton width="100%" height="50vh" />
      </section>
    </SkeletonTheme>
  );
};

export default UserSkeleton;
