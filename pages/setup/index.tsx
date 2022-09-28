import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import SetupView from "../../components/pages/setup";

const SetupPage: NextPage = () => {
  return (
    <Layout>
      <SetupView />
    </Layout>
  );
};

export default withAuthenticationRequired(SetupPage);
