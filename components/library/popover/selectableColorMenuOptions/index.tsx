import React from "react";
import { colorList, IconColors } from "../../../../types/task";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";

const styles = require("./selectableColorMenuOptions.module.scss");

export const getSelectableColorMenuOptions = (
  handleSelection: (color: IconColors) => void,
) => {
  const menuItems = colorList.map((color: IconColors) => {
    const displayText = color.replace("_", " ");
    const { backgroundColor } = getSelectableColorClass(styles, color);
    return {
      content: (
        <div className={styles.itemInfoContainer}>
          {displayText}
          <span className={`${styles.colorIcon} ${backgroundColor}`} />
        </div>
      ),
      onClick: () => handleSelection(color),
    };
  });

  return menuItems;
};
