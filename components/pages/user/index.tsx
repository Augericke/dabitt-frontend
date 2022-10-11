import React, { useState } from "react";
import ThemeSelector from "../../library/themeSelector";

type UserViewProps = {};

const styles = require("./user.module.scss");

const UserView: React.FC<UserViewProps> = (props: UserViewProps) => {
  return (
    <section className={styles.userViewContainer}>
      <h1 className={styles.settingsTitle}>settings</h1>
      <div className={styles.userSettingsContainer}>
        <h2 className={styles.settingsSubtitle}>user</h2>
        <ul className={styles.infoItemsContainer}>
          <li className={styles.infoItemName}>
            username
            <input className={styles.infoItemInput} value={"augericke"} />
          </li>
          <li className={styles.infoItemName}>
            member since
            <span className={styles.infoItemValue}>Aug 25, 2022</span>
          </li>
        </ul>
        <h2 className={styles.settingsSubtitle}>themes</h2>
        <div className={styles.themeSectionContainer}>
          <ThemeSelector />
        </div>
      </div>
    </section>
  );
};

export default UserView;
