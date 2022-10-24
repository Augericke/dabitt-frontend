import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const styles = require("./landing.module.scss");

type LandingViewProps = {};

const LandingView: React.FC<LandingViewProps> = (props: LandingViewProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.introContainer}>
        <hgroup>
          <h1 className={styles.logo}>dabitts</h1>
          <p className={styles.tagline}>the opinionated daily habits app</p>
        </hgroup>
        <button
          className={styles.userButton}
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      </div>
    </section>
  );
};

export default LandingView;
