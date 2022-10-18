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

export function getCSSGlobal(variable: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    variable,
  );
  return value;
}

export function addAlpha(color: string, opacity: number) {
  var opacityValue = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + opacityValue.toString(16).toUpperCase();
}
