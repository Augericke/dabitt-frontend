import { useTheme } from "next-themes";
import dark from "../../../styles/themes/_dark.module.scss";
import light from "../../../styles/themes/_light.module.scss";
import lobby from "../../../styles/themes/_lobby.module.scss";
import sea from "../../../styles/themes/_sea.module.scss";
import cappuccino from "../../../styles/themes/_cappuccino.module.scss";

type ThemeSelectorProps = {};

const styles = require("./themeSelector.module.scss");

const ThemeSelector: React.FC<ThemeSelectorProps> = (
  props: ThemeSelectorProps,
) => {
  const { theme, setTheme } = useTheme();
  const themeList = [
    { name: "dark", data: dark },
    { name: "light", data: light },
    { name: "lobby", data: lobby },
    { name: "sea", data: sea },
    { name: "cappuccino", data: cappuccino },
  ];

  return (
    <div className={styles.cubeContainer}>
      {themeList.map((theme) => {
        return (
          <div
            key={theme.name}
            className={styles.themeContainer}
            onClick={() => {
              setTheme(theme.name);
            }}
          >
            <div className={styles.themeCube}>
              <span
                className={styles.cubePart}
                style={{ backgroundColor: theme.data["icon-color"] }}
              />
              <span
                className={styles.cubePart}
                style={{ backgroundColor: theme.data["foreground-color"] }}
              />
              <span
                className={styles.cubePart}
                style={{ backgroundColor: theme.data["background-color"] }}
              />
            </div>
            <span className={styles.themeTitle}>{theme.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
