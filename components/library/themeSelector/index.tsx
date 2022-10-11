import { useTheme } from "next-themes";
import dark from "../../../styles/themes/_dark.module.scss";
import light from "../../../styles/themes/_light.module.scss";
import lobby from "../../../styles/themes/_lobby.module.scss";
import sea from "../../../styles/themes/_sea.module.scss";
import cappuccino from "../../../styles/themes/_cappuccino.module.scss";
import { useUpdateUser } from "../../../utils/hooks/query/user/useUpdateUser";
import { ThemeColors } from "../../../types/user";

type ThemeSelectorProps = {};

const styles = require("./themeSelector.module.scss");

const ThemeSelector: React.FC<ThemeSelectorProps> = (
  props: ThemeSelectorProps,
) => {
  const updateUser = useUpdateUser();
  const { theme, setTheme } = useTheme();

  const themeList: { name: ThemeColors; data: any }[] = [
    { name: "dark", data: dark },
    { name: "light", data: light },
    { name: "lobby", data: lobby },
    { name: "sea", data: sea },
    { name: "cappuccino", data: cappuccino },
  ];
  const onThemeClick = (selectedTheme: ThemeColors) => {
    setTheme(selectedTheme);
    updateUser.mutate({ preferedTheme: selectedTheme });
  };

  return (
    <div className={styles.cubeContainer}>
      {themeList.map((themeItem) => {
        const isSelected = themeItem.name === theme;
        return (
          <div
            key={themeItem.name}
            className={styles.themeContainer}
            onClick={() => onThemeClick(themeItem.name)}
          >
            <div
              className={
                isSelected ? styles.themeCubeSelected : styles.themeCube
              }
            >
              <span
                className={styles.cubePart}
                style={{ backgroundColor: themeItem.data["icon-color"] }}
              />
              <span
                className={styles.cubePart}
                style={{ backgroundColor: themeItem.data["foreground-color"] }}
              />
              <span
                className={styles.cubePart}
                style={{ backgroundColor: themeItem.data["background-color"] }}
              />
            </div>
            <span
              className={
                isSelected ? styles.themeTitleSelected : styles.themeTitle
              }
            >
              {themeItem.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
