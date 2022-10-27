import type { NextPage } from "next";
import Footer from "../components/library/footer";
import LandingView from "../components/pages/landing";

const Home: NextPage = () => {
  return (
    <>
      <LandingView />
      <Footer />
    </>
  );
};

export default Home;
