import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import UserView from "../../components/pages/user";
import { useUser } from "../../utils/hooks/query/useUser";

const UserPage: NextPage = () => {
  const user = useUser();

  return (
    <Layout>
      {user.isLoading ? (
        <p>todo add skelton & error handling</p>
      ) : user.error ? (
        <p>looks like something went wrong</p>
      ) : (
        <UserView user={user.data} />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(UserPage);
