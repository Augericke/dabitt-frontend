import type { NextPage } from "next";
import Layout from "../../components/layout";
import SetupView from "../../components/pages/setup";

const SetupPage: NextPage = () => {
  return (
    <Layout>
      <SetupView />
    </Layout>
  );
};

export default SetupPage;
