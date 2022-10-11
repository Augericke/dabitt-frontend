/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Router from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "next-themes";
import { api } from "../../../utils/environmentManager";
import ThemeSelector from "../../library/themeSelector";

const styles = require("./setup.module.scss");

type SetupViewProps = {};

const SetupView: React.FC<SetupViewProps> = (props: SetupViewProps) => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const { theme } = useTheme();

  const handleSubmit = async () => {
    try {
      if (!isLoading && user) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const dataConfig = {
          id: user.sub!.replace("|", "-"),
          completedSetup: true,
          preferedTheme: theme,
        };

        const headerConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await api.put(`/user`, dataConfig, headerConfig);
        Router.push("/tasks");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.sectionContainer}>
      <hgroup>
        <h1 className={styles.title}>select your vibe</h1>
        <p className={styles.subtext}>
          (don&apos;t worry you can always change this later)
        </p>
      </hgroup>
      <div className={styles.themeContainer}>
        <ThemeSelector />
      </div>
      <div className={styles.submitButton} onClick={() => handleSubmit()}>
        submit
      </div>
    </section>
  );
};

export default SetupView;
