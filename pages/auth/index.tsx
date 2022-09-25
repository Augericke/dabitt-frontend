import type { NextPage } from "next";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../utils/environmentManager";
import { useEffect } from "react";

const Auth: NextPage = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        if (!isLoading) {
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
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, isLoading, user]);

  return <></>;
};

export default Auth;
