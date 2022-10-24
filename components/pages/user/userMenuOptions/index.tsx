import { LogoutOptions } from "@auth0/auth0-react";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { baseUrl } from "../../../../utils/environmentManager";

const styles = require("./userMenuOptions.module.scss");

export const getUserMenuOptions = (
  handleDelete: () => void,
  logout: (options?: LogoutOptions | undefined) => void,
) => {
  const menuItems = [
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <GiExitDoor /> logout
          </div>
        </div>
      ),
      onClick: () => logout({ returnTo: baseUrl }),
    },
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <AiTwotoneDelete /> delete
          </div>
        </div>
      ),
      onClick: handleDelete,
    },
  ];

  return menuItems;
};
