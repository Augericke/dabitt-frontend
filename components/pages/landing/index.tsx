/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const styles = require("./landing.module.scss");

type LandingViewProps = {};

const LandingView = (props: LandingViewProps) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });
        const response = await fetch("http://localhost:3001/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  console.log(users);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.introContainer}>
        <hgroup>
          {/* TODO: add on load animation */}
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
          {isAuthenticated && (
            <div>
              <h2>{user!.name}</h2>
              <p>{user!.email}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingView;
