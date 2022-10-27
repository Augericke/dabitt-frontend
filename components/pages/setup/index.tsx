import React, { useState } from "react";
import Router from "next/router";
import ThemeSelector from "../../library/themeSelector";
import { useUpdateUser } from "../../../utils/hooks/query/user/useUpdateUser";
import Modal from "../../library/modal";
import Link from "next/link";

const styles = require("./setup.module.scss");

type SetupViewProps = {};

const SetupView: React.FC<SetupViewProps> = (props: SetupViewProps) => {
  const [showModal, setShowModal] = useState(false);
  const updateUser = useUpdateUser();

  const handleSubmit = async () => {
    updateUser.mutate({
      completedSetup: true,
    });
    Router.push("/tasks");
  };

  return (
    <>
      <section className={styles.sectionContainer}>
        <div>
          <h1 className={styles.title}>select your vibe</h1>
          <p className={styles.subtext}>
            (don&apos;t worry you can always change this later)
          </p>
        </div>
        <div className={styles.themeContainer}>
          <ThemeSelector />
        </div>
        <div className={styles.submitButton} onClick={() => setShowModal(true)}>
          continue
        </div>
      </section>
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        content={
          <div className={styles.modalContainer}>
            <h1 className={styles.modalTitle}>before we get started</h1>
            <div className={styles.modalTextContainer}>
              <p>
                dabitts is a hobby project that I put together with the sole
                purpose being for my learning and growth as a web developer.
              </p>
              <p className={styles.additionalText}>
                There are no long term plans to support the project but any
                feedback is very much appreciated! You can reach me via twitter{" "}
                <a
                  href="https://twitter.com/augericke"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.modalLink}
                >
                  @augericke
                </a>
              </p>
              <p>
                Additionally, by creating an account you have agreed to the
                sites{" "}
                <Link href={"/privacy"}>
                  <a className={styles.modalLink}>privacy policy</a>
                </Link>{" "}
                and{" "}
                <Link href={"/terms"}>
                  <a className={styles.modalLink}>terms of service.</a>
                </Link>
              </p>
            </div>
            <div className={styles.modalButtonContainer}>
              <button
                className={styles.modalButton}
                onClick={() => setShowModal(false)}
              >
                back
              </button>
              <button
                className={styles.modalButton}
                onClick={() => handleSubmit()}
              >
                submit
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default SetupView;
