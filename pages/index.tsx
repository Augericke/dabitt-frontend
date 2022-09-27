import type { NextPage } from "next";
import Layout from "../components/layout";
import LandingView from "../components/pages/landing";

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <LandingView />
      </>
    </Layout>
  );
};

export default Home;
