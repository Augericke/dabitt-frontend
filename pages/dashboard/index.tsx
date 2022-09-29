import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import DashboardView from "../../components/pages/dashboard";
import { CategoryModel } from "../../types/task";
import { useApi } from "../../utils/hooks/useApi";

const DashboardPage: NextPage = () => {
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
        <DashboardView categories={categories} setCategories={setCategories} />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(DashboardPage);
