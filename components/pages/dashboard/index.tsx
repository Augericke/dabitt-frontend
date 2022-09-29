import React, { SetStateAction, Dispatch } from "react";
import TaskList from "../../library/taskList";
import CategoryForm from "../../library/categoryForm";
import { CategoryModel } from "../../../types/task";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {
  categories: CategoryModel[];
  setCategories: Dispatch<SetStateAction<CategoryModel[]>>;
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
        <p>todo add looks like you have no categories section</p>
      )}
      <CategoryForm categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default DashboardView;