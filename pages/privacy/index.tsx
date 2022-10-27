import type { NextPage } from "next";
import Layout from "../../components/layout";
import PrivacyView from "../../components/pages/privacy";

const PrivacyPage: NextPage = () => {
  return (
    <Layout
      displayNav={false}
      pageMeta={{
        title: "dabitts | Privacy",
        description: "dabitts privacy policy",
      }}
    >
      <PrivacyView />
    </Layout>
  );
};

export default PrivacyPage;
