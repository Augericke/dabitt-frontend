import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../utils/environmentManager";
import TaskList from "../../library/taskList";
import { CategoryModel } from "../../../types/task";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {
  categories: CategoryModel[] | undefined;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | undefined>>;
};

const DashboardView: React.FC<DashboardViewProps> = ({
  categories,
  setCategories,
}) => {
  return (
    <div className={styles.placeHolderContainer}>
      {categories ? (
        <>
          {categories.map((category, index) => {
            return <TaskList key={index} category={category} />;
          })}
        </>
      ) : (
        <p>hello</p>
      )}
    </div>
  );
};

export default DashboardView;
