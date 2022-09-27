import type { NextPage } from "next";
import Layout from "../../components/layout";
import DashboardView from "../../components/pages/dashboard";

const DashboardPage: NextPage = () => {
  return (
    <Layout>
      <DashboardView />
    </Layout>
  );
};

export default DashboardPage;
