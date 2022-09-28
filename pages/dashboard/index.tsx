import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import DashboardView from "../../components/pages/dashboard";
import { CategoryModel } from "../../types/task";
import { api } from "../../utils/environmentManager";

const DashboardPage: NextPage = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [categories, setCategories] = useState<CategoryModel[]>();

  useEffect(() => {
    (async () => {
      try {
        if (!isLoading && user) {
          const token = await getAccessTokenSilently({
            audience: "API/dabitt",
            scope: "",
          });

          const headerConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await api.get<CategoryModel[]>(
            "/category/user/",
            headerConfig,
          );

          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently, isLoading, user]);

  return (
    <Layout>
      <DashboardView categories={categories} setCategories={setCategories} />
    </Layout>
  );
};

export default DashboardPage;
