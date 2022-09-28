/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import { motion } from "framer-motion";

const styles = require("./tickBox.module.scss");

type TickBoxProps = {
  isTicked: boolean;
  onClick: () => void;
};

const TickBox: React.FC<TickBoxProps> = ({ isTicked, onClick }) => {
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
      className={isTicked ? styles.tickBoxIconFilled : styles.tickBoxIcon}
      animate={isTicked ? "ticked" : "unticked"}
      whileTap="pressed"
      onClick={onClick}
      variants={tickVariants}
    />
  );
};

export default TickBox;
