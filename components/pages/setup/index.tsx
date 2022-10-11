import React from "react";
import Router from "next/router";
import ThemeSelector from "../../library/themeSelector";
import { useUpdateUser } from "../../../utils/hooks/query/user/useUpdateUser";

const styles = require("./setup.module.scss");

type SetupViewProps = {};

const SetupView: React.FC<SetupViewProps> = (props: SetupViewProps) => {
  const updateUser = useUpdateUser();

  const handleSubmit = async () => {
    updateUser.mutate({
      completedSetup: true,
    });
    Router.push("/tasks");
  };

  return (
    <section className={styles.sectionContainer}>
      <hgroup>
        <h1 className={styles.title}>select your vibe</h1>
        <p className={styles.subtext}>
          (don&apos;t worry you can always change this later)
        </p>
      </hgroup>
      <div className={styles.themeContainer}>
        <ThemeSelector />
      </div>
      <div className={styles.submitButton} onClick={() => handleSubmit()}>
        submit
      </div>
    </section>
  );
};

export default SetupView;
