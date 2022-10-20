import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { api } from "../../utils/environmentManager";
import { UserModel } from "../../types/user";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import colors from "../../styles/_selectableColors.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
import ShowOnViewport from "../../components/library/animation/showOnViewport";

const styles = require("../../components/pages/setup/setup.module.scss");

const Auth: NextPage = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  // If auth0 user not present create in postgresDb and redirect to setup
  // otherwise redirect to dashboard
  useEffect(() => {
    (async () => {
      try {
        if (!isLoading && user) {
          const token = await getAccessTokenSilently({
            audience: "API/dabitt",
            scope: "",
          });

          const dataConfig = {
            username: user!.nickname,
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

          Router.push(response.data.completedSetup ? "/tasks" : "/setup");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently, isLoading, user]);

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
