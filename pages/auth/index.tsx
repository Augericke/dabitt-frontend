import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useTheme } from "next-themes";
import { api } from "../../utils/environmentManager";
import { UserModel } from "../../types/user";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import colors from "../../styles/_selectableColors.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
import ShowOnViewport from "../../components/library/animation/showOnViewport";
import userService from "../../utils/services/user";

const styles = require("../../components/pages/setup/setup.module.scss");

const Auth: NextPage = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const { setTheme } = useTheme();

  // If auth0 user not present create in postgresDb and redirect to setup
  // otherwise redirect to dashboard
  useEffect(() => {
    (async () => {
      try {
        if (!isLoading && user) {
          const token = await getAccessTokenSilently();

          const dataConfig = {
            username: "dabitter",
          };

          const headerConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await api.post<UserModel>(
            "/user",
            dataConfig,
            headerConfig,
          );

          if (response.data.completedSetup) {
            const userResponse = await userService.read();
            setTheme(userResponse.userPreference.preferedTheme);
            Router.push("/tasks");
          } else {
            Router.push("/setup");
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently, isLoading, setTheme, user]);

  return (
    <SkeletonTheme
      baseColor={colors["foreground-color"]}
      highlightColor={colors["icon-color"]}
    >
      <ShowOnViewport duration={2} delay={0.5}>
        <section className={styles.sectionContainer}>
          <Skeleton width="15vw" height="15vw" circle />
        </section>
      </ShowOnViewport>
    </SkeletonTheme>
  );
};

export default withAuthenticationRequired(Auth);
