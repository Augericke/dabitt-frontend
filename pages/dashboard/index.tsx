import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import DashboardView from "../../components/pages/dashboard";
import { useCategory } from "../../utils/hooks/query/category/useCategory";
import DashboardSkeleton from "../../components/pages/dashboard/skeleton";
import ErrorView from "../../components/library/error";

const DashboardPage: NextPage = () => {
  const categories = useCategory();
  return (
    <Layout>
      {categories.isLoading ? (
        <DashboardSkeleton />
      ) : categories.error ? (
        <div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
          <ErrorView />
        </div>
      ) : (
        <DashboardView
          categories={categories.data.sort((a, b) =>
            a.name.localeCompare(b.name),
          )}
        />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(DashboardPage);
