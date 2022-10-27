import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NavBar from "../library/navBar";
import Footer from "../library/footer";
import Banner from "../../public/assets/dabitts-banner.jpg";

const styles = require("./layout.module.scss");

type LayoutProps = {
  children: React.ReactElement;
  displayNav?: boolean;
  displayFooter?: boolean;
  pageMeta?: {};
};

const Layout: React.FC<LayoutProps> = ({
  children,
  pageMeta,
  displayNav = true,
  displayFooter = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Default meta tags if not otherwise set via the pageMeta prop
  const meta = {
    title: "dabitts",
    description: "The daily habits app.",
    type: "website",
    siteName: "dabitts",
    url: `https://dabitts.com${router.asPath}`,
    image: `https://www.dabitts.com${Banner.src}`,
    imageAlt: "dabitts - the daily habits app",
    ...pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:image:alt" content={meta.imageAlt} />
        <meta name="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:site" content="@augericke" />
        <meta property="twitter:creator" content="@augericke" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {displayNav && <NavBar />}
        <main className={styles.mainContentContainer}>
          {React.cloneElement(children)}
        </main>
        {displayFooter && <Footer />}
      </div>
    </>
  );
};

export default Layout;
