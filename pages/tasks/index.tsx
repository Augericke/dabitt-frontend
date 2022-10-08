import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import TasksView from "../../components/pages/tasks";
import { useCategory } from "../../utils/hooks/query/useCategory";

const TasksPage: NextPage = () => {
  const categories = useCategory();

  return (
    <Layout>
      {categories.isLoading ? (
        <p>todo add skelton & error handling</p>
      ) : categories.error ? (
        <p>looks like something went wrong</p>
      ) : (
        <TasksView categories={categories.data} />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(TasksPage);
