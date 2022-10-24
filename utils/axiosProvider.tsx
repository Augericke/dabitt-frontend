import { useAuth0 } from "@auth0/auth0-react";
import { api } from "./environmentManager";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import React, { useContext, useEffect } from "react";

type AxiosContext = AxiosInstance | null;

const AxiosContext = React.createContext<AxiosContext | null>(null);

export function useAxios() {
  return useContext(AxiosContext);
}

//@ts-ignore
export function AxiosProvider({ children }) {
  const { getAccessTokenSilently, isLoading } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        if (!isLoading) {
          const token = await getAccessTokenSilently();

          api.interceptors.request.use(
            (config: AxiosRequestConfig) => {
              if (!config?.headers) {
                throw new Error(
                  `Expected 'config' and 'config.headers' not to be undefined`,
                );
              }
              config.headers["Authorization"] = `Bearer ${token}`;
              config.headers["Content-Type"] = "application/json";
              return config;
            },
            (error) => {
              Promise.reject(error);
            },
          );
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, isLoading]);

  return <AxiosContext.Provider value={api}>{children}</AxiosContext.Provider>;
}
