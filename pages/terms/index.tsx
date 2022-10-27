import type { NextPage } from "next";
import Layout from "../../components/layout";
import TermsView from "../../components/pages/terms";

const TermsPage: NextPage = () => {
  return (
    <Layout
      displayNav={false}
      pageMeta={{
        title: "dabitts | ToS",
        description: "dabitts terms of service",
      }}
    >
      <TermsView />
    </Layout>
  );
};

export default TermsPage;
