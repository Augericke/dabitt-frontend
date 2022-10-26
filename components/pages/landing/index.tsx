import React, { useEffect, useState } from "react";
import { RedirectLoginOptions, useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import colorOptions from "../../../styles/_selectableColors.module.scss";
import ShowOnViewport from "../../library/animation/showOnViewport";
import ThemeSelector from "../../library/themeSelector";
import { useTheme } from "next-themes";
import BarChartDemo from "../../library/charts/bar/demo";

const styles = require("./landing.module.scss");

type LandingViewProps = {};

const LandingView: React.FC<LandingViewProps> = (props: LandingViewProps) => {
  const { loginWithRedirect } = useAuth0();
  const calendarColors = [
    colorOptions["icon-color"],
    colorOptions["foreground-color"],
    colorOptions["subtle-color"],
  ];
  const { theme, setTheme } = useTheme();

  // Don't show ui until page mounted to avoid hydration issue with theme selector
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <section className={styles.landingContainer}>
        <div className={styles.introContainer}>
          <hgroup>
            <h1 className={styles.logo}>dabitts</h1>
            <p className={styles.tagline}>the opinionated daily habits app</p>
          </hgroup>
          <div className={styles.buttonContainer}>
            <button
              className={styles.userButton}
              onClick={() => loginWithRedirect()}
            >
              log in
            </button>
            <button
              className={styles.userButton}
              onClick={() => loginWithRedirect()}
            >
              sign up
            </button>
          </div>
        </div>
        <div className={styles.calendarContainer}>
          {[...Array(31)].map((e, i) => {
            const selectedColor =
              calendarColors[Math.floor(Math.random() * calendarColors.length)];

            return (
              <AnimatePresence key={i}>
                <motion.div
                  key={i}
                  className={styles.dayContainer}
                  initial={{ y: 0 }}
                  animate={{
                    backgroundColor: selectedColor,
                    y: 3,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    repeatDelay: 3,
                    delay: i / 3,
                  }}
                />
              </AnimatePresence>
            );
          })}
        </div>
      </section>
      <ThemeSection />
      <AnalyticsSection />
      <GetStartedSection loginWithRedirect={loginWithRedirect} />
    </>
  );
};

export default LandingView;

const ThemeSection: React.FC = () => {
  return (
    <ShowOnViewport>
      <section className={styles.themeSectionContainer}>
        <ShowOnViewport customClass={styles.themeContainer}>
          <>
            <div className={styles.headerContainer}>
              <h1 className={styles.title}>match your style</h1>
              <p className={styles.subtext}>
                pick whichever theme fits your vibe the best
              </p>
            </div>
            <ThemeSelector />
          </>
        </ShowOnViewport>
      </section>
    </ShowOnViewport>
  );
};

const AnalyticsSection: React.FC = () => {
  return (
    <ShowOnViewport>
      <section className={styles.analyticsSectionContainer}>
        <ShowOnViewport customClass={styles.analyticsContainer}>
          <>
            <div className={styles.barChartContainer}>
              <BarChartDemo />
            </div>
            <div className={styles.headerContainer}>
              <h1 className={styles.title}>track your progress</h1>
              <p className={styles.subtext}>
                with daily analytics that show where and how you are spending
                your time
              </p>
            </div>
          </>
        </ShowOnViewport>
      </section>
    </ShowOnViewport>
  );
};

type GetStartedProps = {
  loginWithRedirect: (
    options?: RedirectLoginOptions | undefined,
  ) => Promise<void>;
};

const GetStartedSection: React.FC<GetStartedProps> = ({
  loginWithRedirect,
}) => {
  return (
    <ShowOnViewport>
      <section className={styles.getStartedSectionContainer}>
        <ShowOnViewport customClass={styles.startedContainer}>
          <>
            <div className={styles.buttonContainer}>
              <button
                className={styles.userButton}
                onClick={() => loginWithRedirect()}
              >
                create account
              </button>
            </div>
            <div className={styles.headerContainer}>
              <h1 className={styles.title}>lets get started</h1>
            </div>
          </>
        </ShowOnViewport>
      </section>
    </ShowOnViewport>
  );
};
