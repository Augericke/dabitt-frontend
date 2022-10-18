import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import DashboardView from "../../components/pages/dashboard";
import { useCategory } from "../../utils/hooks/query/category/useCategory";

const DashboardPage: NextPage = () => {
  const categories = useCategory();
  return (
    <Layout>
      {categories.isLoading ? (
        <p>loading</p>
      ) : categories.error ? (
        <p>looks like something went wrong</p>
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
