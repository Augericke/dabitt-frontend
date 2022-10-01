import React from "react";
import { motion } from "framer-motion";
import { getSelectableColorClass } from "../../../utils/selectableColorClass";

const styles = require("./tickBox.module.scss");

type TickBoxProps = {
  isTicked: boolean;
  onClick: () => void;
  selectedColor?: string;
};

const TickBox: React.FC<TickBoxProps> = ({
  isTicked,
  onClick,
  selectedColor = "",
}) => {
  const { backgroundColor, borderColor } = getSelectableColorClass(
    styles,
    selectedColor,
  );

  const tickVariants = {
    pressed: { scale: 0.95 },
    ticked: {
      scale: [0.85, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    unticked: {
      scale: [1.1, 0.95, 1],
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.button
      className={
        isTicked
          ? `${styles.tickBoxIcon} ${backgroundColor} ${borderColor}`
          : `${styles.tickBoxIconEmpty} ${borderColor}`
      }
      animate={isTicked ? "ticked" : "unticked"}
      whileTap="pressed"
      onClick={onClick}
      variants={tickVariants}
    />
  );
};

export default TickBox;
