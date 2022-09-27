import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { api } from "../../utils/environmentManager";
import { UserModel } from "../../types/user";

const Auth: NextPage = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  // If auth0 user not present create in postgresDb and redirect to setup
  // otherwise redirect to dashboard
  useEffect(() => {
    (async () => {
      try {
        if (!isLoading) {
          // TODO: standardize api call in a custom hook
          const token = await getAccessTokenSilently({
            audience: "API/dabitt",
            scope: "",
          });

          const dataConfig = {
            id: user!.sub?.substring(6),
            username: user!.nickname,
          };

          const headerConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await api.post<UserModel>(
            "/user",
            dataConfig,
            headerConfig,
          );

          Router.push(response.data.completedSetup ? "/dashboard" : "/setup");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, isLoading, user]);

  return <></>;
};

export default Auth;