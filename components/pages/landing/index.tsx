import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const styles = require("./landing.module.scss");

type LandingViewProps = {};

const LandingView: React.FC<LandingViewProps> = (props: LandingViewProps) => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.introContainer}>
        <hgroup>
          <h1 className={styles.logo}>dabitt</h1>
          <p className={styles.tagline}>the opinionated daily habit app</p>
        </hgroup>
        <div>
          <button
            className={styles.userButton}
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
          <button
            className={styles.userButton}
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingView;
