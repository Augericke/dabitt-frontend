import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import TasksView from "../../components/pages/tasks";
import { useCategory } from "../../utils/hooks/query/category/useCategory";
import TasksSkeleton from "../../components/pages/tasks/skeleton";

const TasksPage: NextPage = () => {
  const categories = useCategory();

  return (
    <Layout>
      {categories.isLoading ? (
        <TasksSkeleton />
      ) : categories.error ? (
        <p>looks like something went wrong</p>
      ) : (
        <TasksView categories={categories.data} />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(TasksPage);
