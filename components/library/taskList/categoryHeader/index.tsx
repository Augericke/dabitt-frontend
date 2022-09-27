/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";

const styles = require("./categoryHeader.module.scss");

type CategoryHeaderProps = {
  name: string;
  count: number;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ name, count }) => {
  return (
    <h1 className={styles.categoryName}>
      {name} <div className={styles.categoryCount}>{count}</div>
    </h1>
  );
};

export default CategoryHeader;
