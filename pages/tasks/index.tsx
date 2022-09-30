import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import TasksView from "../../components/pages/tasks";
import { CategoryModel } from "../../types/task";
import { useApi } from "../../utils/hooks/useApi";

const TasksPage: NextPage = () => {
  const { loading, error, data } = useApi("/category/user/", {});
  const [categories, setCategories] = useState<CategoryModel[] | null>([]);

  useEffect(() => {
    setCategories(data);
  }, [data]);

  return (
    <Layout>
      {loading ? (
        <p>todo add skelton & error handling</p>
      ) : (
        <TasksView categories={categories} setCategories={setCategories} />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(TasksPage);
