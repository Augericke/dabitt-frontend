import React from "react";

const styles = require("./landing.module.scss");

type LandingViewProps = {};

const LandingView = (props: LandingViewProps) => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.introContainer}>
        <hgroup>
          {/* TODO: add on load animation */}
          <h1 className={styles.logo}>dabitt</h1>
          <p className={styles.tagline}>the daily habit app</p>
        </hgroup>
        <div>
          <span className={styles.userButton}>login</span>
          <a className={styles.userButton}>sign up</a>
        </div>
      </div>
    </section>
  );
};

export default LandingView;
