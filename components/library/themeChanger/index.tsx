import { useTheme } from "next-themes";

// const styles = require("./themeChanger.module.scss");

type ThemeChangerProps = {};

const ThemeChanger: React.FC<ThemeChangerProps> = (
  props: ThemeChangerProps,
) => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("dark")}>dark</button>
      <button onClick={() => setTheme("lobby")}>lobby</button>
    </div>
  );
};

export default ThemeChanger;
