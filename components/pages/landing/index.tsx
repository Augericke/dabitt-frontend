/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

const styles = require("./landing.module.scss");

type LandingViewProps = {};

const LandingView = (props: LandingViewProps) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(user);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.introContainer}>
        <hgroup>
          {/* TODO: add on load animation */}
          <h1 className={styles.logo}>dabitt</h1>
          <p className={styles.tagline}>the daily habit app</p>
        </hgroup>
        <div>
          <a href="/api/auth/login" className={styles.userButton}>
            login
          </a>
          <a href="/api/auth/logout" className={styles.userButton}>
            log out
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingView;
