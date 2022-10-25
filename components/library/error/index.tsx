import React from "react";
import ShowOnViewport from "../animation/showOnViewport";

const styles = require("./error.module.scss");

type ErrorViewProps = {
  title?: string;
  showBody?: boolean;
  showBorder?: boolean;
};

const ErrorView: React.FC<ErrorViewProps> = ({
  title,
  showBody = true,
  showBorder = true,
}) => {
  return (
    <ShowOnViewport
      customClass={
        showBorder ? styles.errorContainerBorder : styles.errorContainer
      }
    >
      <>
        <span className={styles.errorHeader}>
          {title ? title : "There was an issue with your request."}
        </span>
        {showBody && (
          <span className={styles.errorSubheader}>
            Sorry for the inconvenience. It looks like there are still some
            things for me to learn. If this issue continues please reach out at{" "}
            <a
              className={styles.errorSocialLink}
              href="https://twitter.com/augericke"
              target="_blank"
              rel="noreferrer"
            >
              @augericke
            </a>
          </span>
        )}
      </>
    </ShowOnViewport>
  );
};

export default ErrorView;
