import type { NextPage } from "next";
import Layout from "../components/layout";
import ThemeChanger from "../components/library/themeChanger";
import LandingView from "../components/pages/landing";

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <LandingView />
        <ThemeChanger />
      </>
    </Layout>
  );
};

export default Home;
