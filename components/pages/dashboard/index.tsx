import React from "react";
import CalenderMap from "../../library/charts/calendarMap";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {};

const DashboardView: React.FC<DashboardViewProps> = (
  props: DashboardViewProps,
) => {
  return (
    <div className={styles.placeHolderContainer}>
      <CalenderMap />
    </div>
  );
};

export default DashboardView;
