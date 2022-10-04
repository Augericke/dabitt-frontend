import React from "react";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {};

const DashboardView: React.FC<DashboardViewProps> = (
  props: DashboardViewProps,
) => {
  return (
    <div className={styles.placeHolderContainer}>
      <p>gm world</p>
    </div>
  );
};

export default DashboardView;
