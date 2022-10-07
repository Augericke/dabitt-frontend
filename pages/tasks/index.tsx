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
import categoryService from "../../utils/services/category";
import { useAxios } from "../../utils/axiosProvider";

const TasksPage: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState<CategoryModel[] | null>([]);

  useEffect(() => {
    (async () => {
      try {
        const { startTime, endTime } = getUTCDayRange(selectedDate);
        const isCurrent = getIsCurrent(selectedDate) ? 1 : 0;
        const isFuture = getIsFuture(selectedDate) ? 1 : 0;

        const categoriesTasks = await categoryService.read({
          startTime,
          endTime,
          isCurrent,
          isFuture,
        });
        setCategories(categoriesTasks);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedDate]);

  return (
    <Layout>
      {false ? (
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
