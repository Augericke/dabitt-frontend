/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Router from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "next-themes";
import { api } from "../../../utils/environmentManager";

const styles = require("./setup.module.scss");

type SetupViewProps = {};

const SetupView = (props: SetupViewProps) => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const { theme, setTheme } = useTheme();
  const themes = ["Light", "Dark", "Lobby"];

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
        Router.push("/dashboard");
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
        {themes.map((optionalTheme, index) => {
          const isSelected = optionalTheme.toLowerCase() === theme;

          let themeCube: string;
          switch (optionalTheme) {
            case "Light":
              themeCube = isSelected
                ? styles.themeCubeLightSelected
                : styles.themeCubeLight;
              break;
            case "Dark":
              themeCube = isSelected
                ? styles.themeCubeDarkSelected
                : styles.themeCubeDark;
              break;
            case "Lobby":
              themeCube = isSelected
                ? styles.themeCubeLobbySelected
                : styles.themeCubeLobby;
              break;
            default:
              themeCube = styles.themeCubeLight;
          }

          return (
            <div
              key={index}
              className={styles.themeSelector}
              onClick={() => setTheme(optionalTheme.toLowerCase())}
            >
              <div className={themeCube}>
                <span className={styles.themeIcon} />
                <span className={styles.themeForeground} />
                <span className={styles.themeBackground} />
              </div>
              <h2
                className={
                  isSelected ? styles.themeTitleSelected : styles.themeTitle
                }
              >
                {optionalTheme}
              </h2>
            </div>
          );
        })}
      </div>
      <div className={styles.submitButton} onClick={() => handleSubmit()}>
        submit
      </div>
    </section>
  );
};

export default SetupView;
