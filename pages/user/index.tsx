import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import UserView from "../../components/pages/user";

const UserPage: NextPage = () => {
  // const categories = useCategory();

  return (
    <Layout>
      {false ? (
        <p>todo add skelton & error handling</p>
      ) : false ? (
        <p>looks like something went wrong</p>
      ) : (
        <UserView />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(UserPage);
