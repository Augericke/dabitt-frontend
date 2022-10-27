import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import SetupView from "../../components/pages/setup";
import Layout from "../../components/layout";

const SetupPage: NextPage = () => {
  return (
    <Layout
      displayNav={false}
      displayFooter={false}
      pageMeta={{
        title: "dabitts | Setup",
        description: "Just a few things to get in order.",
      }}
    >
      <SetupView />
    </Layout>
  );
};

export default withAuthenticationRequired(SetupPage);
