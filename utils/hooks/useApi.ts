import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { baseApiUrl } from "../environmentManager";

export const useApi = (path: string, options: any) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { scope, ...fetchOptions } = options;
        const apiScope = scope ?? "";
        const audience = process.env.NEXT_PUBLIC_AUTH0_PUBLIC_AUDIENCE;
        const accessToken = await getAccessTokenSilently({
          audience,
          apiScope,
        });

        const res = await fetch(`${baseApiUrl}${path}`, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          //@ts-ignore
          error,
          loading: false,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
