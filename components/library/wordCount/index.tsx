import React from "react";
import { IconColors } from "../../../types/task";
import { getSelectableColorClass } from "../../../utils/selectableColorClass";

type WordCountProps = {
  content: string;
  characterLimit: number;
  color?: IconColors;
  customClass?: string;
};

const styles = require("./wordCount.module.scss");

const WordCount: React.FC<WordCountProps> = ({
  content,
  characterLimit,
  color = "default",
  customClass,
}) => {
  const { textColor } = getSelectableColorClass(styles, color);
  const contentLength = content.length;
  const isOver = contentLength >= characterLimit;

  const defaultClass = isOver
    ? styles.wordCountContainerOver
    : styles.wordCountContainer;

  const wordCountContainer = customClass
    ? `${customClass} ${defaultClass}`
    : defaultClass;

  return (
    <span
      className={
        isOver ? `${wordCountContainer} ${textColor}` : wordCountContainer
      }
    >
      {contentLength}/{characterLimit}
    </span>
  );
};

export default WordCount;
