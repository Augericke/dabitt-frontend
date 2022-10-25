import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Layout from "../../components/layout";
import UserView from "../../components/pages/user";
import { useUser } from "../../utils/hooks/query/user/useUser";
import UserSkeleton from "../../components/pages/user/skeleton";
import ErrorView from "../../components/library/error";

const UserPage: NextPage = () => {
  const user = useUser();

  return (
    <Layout>
      {user.isLoading ? (
        <UserSkeleton />
      ) : user.isError ? (
        <div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
          <ErrorView />
        </div>
      ) : (
        <UserView user={user.data} />
      )}
    </Layout>
  );
};

export default withAuthenticationRequired(UserPage);
