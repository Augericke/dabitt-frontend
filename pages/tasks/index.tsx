import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import TasksView from "../../components/pages/tasks";
import { CategoryModel } from "../../types/category";
import { useCategory } from "../../utils/hooks/query/useCategory";

const TasksPage: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);

  const categoryArray = useCategory();
  useEffect(() => {
    if (categoryArray.data) {
      setCategories(categoryArray.data);
    }
  }, [categoryArray]);

  return (
    <Layout>
      {categoryArray.isLoading ? (
        <p>todo add skelton & error handling</p>
      ) : (
        <TasksView
          categories={categories}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(TasksPage);
