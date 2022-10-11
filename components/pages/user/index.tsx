import React, { useState } from "react";
import { useTheme } from "next-themes";
import ThemeSelector from "../../library/themeSelector";

type UserViewProps = {};

const styles = require("./user.module.scss");

const UserView: React.FC<UserViewProps> = (props: UserViewProps) => {
  return (
    <section className={styles.userViewContainer}>
      <h1 className={styles.settingsTitle}>settings</h1>
      <div className={styles.userSettingsContainer}>
        <ul className={styles.infoItemsContainer}>
          <li className={styles.infoItemName}>
            username
            <input
              className={styles.infoItemValue}
              placeholder={"augericke"}
            ></input>
          </li>
          <li className={styles.infoItemName}>
            member since
            <span className={styles.infoItemValue}>Aug 25, 2022</span>
          </li>
        </ul>
        <h2>themes</h2>
        <div>
          <ThemeSelector />
        </div>
      </div>
    </section>
  );
};

export default UserView;
