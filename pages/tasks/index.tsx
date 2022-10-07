import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import TasksView from "../../components/pages/tasks";
import { CategoryModel } from "../../types/task";
import {
  getUTCDayRange,
  getIsCurrent,
  getIsFuture,
} from "../../utils/dateComputer";
import { useCategoryTasks } from "../../utils/hooks/query/useCategoryTasks";

const TasksPage: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState<CategoryModel[] | null>([]);

  //Request Categories
  const selectedTimeSpan = getUTCDayRange(selectedDate);
  const isCurrent = getIsCurrent(selectedDate) ? 1 : 0;
  const isFuture = getIsFuture(selectedDate) ? 1 : 0;

  const categoryTasks = useCategoryTasks({
    ...selectedTimeSpan,
    isCurrent,
    isFuture,
  });

  useEffect(() => {
    if (categoryTasks.data) {
      setCategories(categoryTasks.data);
    }
  }, [categoryTasks]);

  return (
    <Layout>
      {categoryTasks.isLoading ? (
        <p>todo add skelton & error handling</p>
      ) : (
        <TasksView
          categories={categories}
          setCategories={setCategories}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(TasksPage);
