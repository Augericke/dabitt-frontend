import React, { useContext, useEffect, useState } from "react";
import { useAuth0, OAuthError } from "@auth0/auth0-react";
import { ThemeProvider } from "next-themes";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { api } from "./environmentManager";
import Layout from "../components/layout";

type AxiosContext = AxiosInstance | null;

const AxiosContext = React.createContext<AxiosContext | null>(null);

export function useAxios() {
  return useContext(AxiosContext);
}

export function AxiosProvider({ children }: { children: React.ReactElement }) {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [isInterceptorAdded, setInterceptorAdded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        if (!isLoading && isAuthenticated) {
          const token = await getAccessTokenSilently();

          api.interceptors.request.use(
            (config: AxiosRequestConfig) => {
              if (!config?.headers) {
                throw new Error(
                  "'config' and 'config.headers' should be defined",
                );
              }
              config.headers.Authorization = `Bearer ${token}`;
              config.headers["Content-Type"] = "application/json";
              return config;
            },
            (error) => {
              Promise.reject(error);
            },
          );
          setInterceptorAdded(true);
        }
      } catch (e) {
        if (e instanceof OAuthError) {
          const error = e as OAuthError;
          if (error.message !== "Login required") {
            console.error(error);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

  if (isInterceptorAdded || (!isLoading && !isAuthenticated)) {
    return (
      <AxiosContext.Provider value={api}>{children}</AxiosContext.Provider>
    );
  } else {
    return (
      <ThemeProvider themes={["light", "dark", "coffee", "sea", "cappuccino"]}>
        <Layout>
          <></>
        </Layout>
      </ThemeProvider>
    );
  }
}
