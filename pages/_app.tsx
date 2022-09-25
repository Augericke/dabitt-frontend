import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "next-themes";

const onRedirectCallback = (appState: any) => {
  Router.replace(appState?.returnTo || "/");
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_CLIENT_ID!}
      audience={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_AUDIENCE!}
      scope="read:users"
      redirectUri={"http://localhost:3000/auth"}
      // onRedirectCallback={onRedirectCallback}
    >
      <ThemeProvider themes={["light", "dark", "coffee"]}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default MyApp;
