import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "next-themes";
import { AxiosProvider } from "../utils/axiosProvider";
import { baseUrl } from "../utils/environmentManager";
import colorOptions from "../styles/_selectableColors.module.scss";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const mainElements = (
    <ThemeProvider themes={["light", "dark", "coffee", "sea", "cappuccino"]}>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          error: {
            iconTheme: {
              primary: colorOptions["icon-color"],
              secondary: colorOptions["text-color"],
            },
            style: {
              fontFamily: "Poppins",
              fontWeight: 200,
              fontSize: "14px",
              background: colorOptions["foreground-color"],
              border: `1px solid ${colorOptions["subtle-color"]}`,
              color: colorOptions["text-color"],
            },
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_DOMAIN!}
          clientId={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_CLIENT_ID!}
          audience={process.env.NEXT_PUBLIC_AUTH0_PUBLIC_AUDIENCE!}
          useRefreshTokens
          scope="read:current_user"
          redirectUri={`${baseUrl}/auth`}
          cacheLocation="localstorage"
        >
          {router.pathname === "/" ? (
            mainElements
          ) : (
            <AxiosProvider>{mainElements}</AxiosProvider>
          )}
        </Auth0Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
