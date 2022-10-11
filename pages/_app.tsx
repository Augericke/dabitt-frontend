import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "next-themes";
import { AxiosProvider } from "../utils/axiosProvider";

// const onRedirectCallback = (appState: any) => {
//   Router.replace(appState?.returnTo || "/");
// };

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_CLIENT_ID!}
        audience={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_AUDIENCE!}
        scope="read:users"
        redirectUri={"http://localhost:3000/auth"}
        // onRedirectCallback={onRedirectCallback}
      >
        <AxiosProvider>
          <ThemeProvider themes={["light", "dark", "coffee", "sea"]}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </AxiosProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
