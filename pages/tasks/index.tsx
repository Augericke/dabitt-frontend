import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import TasksView from "../../components/pages/tasks";
import { CategoryModel } from "../../types/task";
import { useApiHeader } from "../../utils/hooks/useApi";
import {
  getUTCDayRange,
  getIsCurrent,
  getIsFuture,
} from "../../utils/dateComputer";
import categoryService from "../../utils/services/category";

const TasksPage: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState<CategoryModel[] | null>([]);

  // Get Api Header
  const { error, loading, header } = useApiHeader();
  const [authHeader, setAuthHeader] = useState<any>();
  useEffect(() => {
    if (!error && !loading) {
      setAuthHeader(header);
    }
  }, [error, header, loading]);

  useEffect(() => {
    (async () => {
      try {
        if (authHeader) {
          const { startTime, endTime } = getUTCDayRange(selectedDate);
          const isCurrent = getIsCurrent(selectedDate) ? 1 : 0;
          const isFuture = getIsFuture(selectedDate) ? 1 : 0;

          const categoriesTasks = await categoryService.read(
            { startTime, endTime, isCurrent, isFuture },
            authHeader,
          );
          setCategories(categoriesTasks);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [authHeader, selectedDate]);

  return (
    <Layout>
      {loading ? (
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
