import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import TasksView from "../../components/pages/tasks";
import { useCategory } from "../../utils/hooks/query/category/useCategory";
import TasksSkeleton from "../../components/pages/tasks/skeleton";
import ErrorView from "../../components/library/error";

const TasksPage: NextPage = () => {
  const categories = useCategory();

  return (
    <Layout>
      {categories.isLoading ? (
        <TasksSkeleton />
      ) : categories.isError ? (
        <div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
          <ErrorView />
        </div>
      ) : (
        <TasksView
          categories={categories.data.sort((a, b) =>
            a.name.localeCompare(b.name),
          )}
        />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(TasksPage);
