import Link from "next/link";
import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const styles = require("./footer.module.scss");

type FooterProps = {};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerItems}>
        <div className={styles.brandItems}>
          <Link href="/">
            <a className={styles.logo}>dabitts</a>
          </Link>
          <div className={styles.socialContainer}>
            <a
              className={styles.socialIcon}
              href="https://twitter.com/augericke"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              className={styles.socialIcon}
              href="https://github.com/Augericke/dabitt-frontend"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              className={styles.socialIcon}
              href="https://www.linkedin.com/in/austingericke/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className={styles.legalItems}>
          <Link href="/terms">
            <a>
              <span>terms of service</span>
            </a>
          </Link>
          <Link href="/privacy">
            <a>
              <span>privacy policy</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
