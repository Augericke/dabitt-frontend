import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// const styles = require("./layout.module.scss");

type LayoutProps = {
  children: React.ReactElement;
  pageMeta?: {};
};

const Layout: React.FC<LayoutProps> = ({ children, pageMeta }) => {
  const router = useRouter();

  // Default meta tags if not otherwise set via the pageMeta prop
  const meta = {
    title: "dabitt",
    description: "The daily habit app.",
    type: "website",
    siteName: "dabitt",
    url: `http://localhost:3000${router.asPath}`,
    // image: TODO,
    // imageAlt: TODO,
    ...pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.siteName} />
        {/* <meta property="og:title" content={meta.title} /> */}
        {/* <meta property="og:image" content={meta.image} /> */}
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />
        {/* <meta name="twitter:image" content={meta.image} /> */}
        {/* <meta name="twitter:image:alt" content={meta.imageAlt} /> */}
        <meta name="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:site" content="@augericke" />
        <meta property="twitter:creator" content="@augericke" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>{React.cloneElement(children)}</main>
      </div>
    </>
  );
};

export default Layout;
