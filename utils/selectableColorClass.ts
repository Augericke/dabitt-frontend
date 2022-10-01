import { IconColors } from "../types/task";

export const getSelectableColorClass = (styles: any, color: IconColors) => {
  let backgroundColor: string;
  let outlineColor: string;
  let textColor: string;
  let borderColor: string;
  switch (color) {
    case "default":
      backgroundColor = styles.backgroundColorDefault;
      outlineColor = styles.outlineColorDefault;
      borderColor = styles.borderColorDefault;
      textColor = styles.textColorDefault;
      break;
    case "default_secondary":
      backgroundColor = styles.backgroundColorDefaultSecondary;
      outlineColor = styles.outlineColorSecondary;
      borderColor = styles.borderColorDefaultSecondary;
      textColor = styles.textColorDefaultSecondary;
      break;
    case "forest":
      backgroundColor = styles.backgroundColorForest;
      outlineColor = styles.outlineColorForest;
      borderColor = styles.borderColorForest;
      textColor = styles.textColorForest;
      break;
    case "coffee":
      backgroundColor = styles.backgroundColorCoffee;
      outlineColor = styles.outlineColorCoffee;
      borderColor = styles.borderColorCoffee;
      textColor = styles.textColorCoffee;
      break;
    case "blush":
      backgroundColor = styles.backgroundColorBlush;
      outlineColor = styles.outlineColorBlush;
      borderColor = styles.borderColorBlush;
      textColor = styles.textColorBlush;
      break;
    case "tan":
      backgroundColor = styles.backgroundColorTan;
      outlineColor = styles.outlineColorTan;
      borderColor = styles.borderColorTan;
      textColor = styles.textColorTan;
      break;
    case "space":
      backgroundColor = styles.backgroundColorSpace;
      outlineColor = styles.outlineColorspace;
      borderColor = styles.borderColorSpace;
      textColor = styles.textColorSpace;
      break;
    case "steel":
      backgroundColor = styles.backgroundColorSteel;
      outlineColor = styles.outlineColorSteel;
      borderColor = styles.borderColorSteel;
      textColor = styles.textColorSteel;
      break;
    case "copper":
      backgroundColor = styles.backgroundColorCopper;
      outlineColor = styles.outlineColorCopper;
      borderColor = styles.borderColorCopper;
      textColor = styles.textColorCopper;
      break;
    case "pine_cone":
      backgroundColor = styles.backgroundColorPineCone;
      outlineColor = styles.outlineColorPineCone;
      borderColor = styles.borderColorPineCone;
      textColor = styles.textColorPineCone;
      break;
    default:
      backgroundColor = styles.backgroundColorDefault;
      outlineColor = styles.outlineColorDefault;
      borderColor = styles.borderColorDefault;
      textColor = styles.textColorDefault;
  }

  return {
    backgroundColor,
    outlineColor,
    borderColor,
    textColor,
  };
};
