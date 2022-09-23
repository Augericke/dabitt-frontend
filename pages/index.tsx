import type { NextPage } from "next";
import Layout from "../components/layout";
import ThemeChanger from "../components/library/themeChanger";

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <p>hello dabitt</p>
        <ThemeChanger />
      </>
    </Layout>
  );
};

export default Home;
