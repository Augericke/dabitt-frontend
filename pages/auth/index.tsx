import type { NextPage } from "next";
import Router from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../utils/environmentManager";
import { useEffect } from "react";

const Auth: NextPage = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  // If auth0 user not present create in postgresDb and redirect to dashboard
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
            id: user!.sub,
            username: user!.nickname,
          };

          const headerConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          await api.post("user", dataConfig, headerConfig);
          Router.push("/dashboard");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, isLoading, user]);

  return <></>;
};

export default Auth;
