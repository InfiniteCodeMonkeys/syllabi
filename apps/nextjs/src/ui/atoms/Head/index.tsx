import React from "react";
import Head from "next/head";
import getDarkMode from "../../../helpers/useDarkMode";

const NextHead = () => {
  const isDarkMode = getDarkMode();

  return (
    <Head>
      <title>theCurricula</title>
      <meta
        name="description"
        content="Find the best curriculum for whatever you want to learn."
      />
      <link
        rel="icon"
        href={isDarkMode ? "/short_logo_white.png" : "/short_logo_black.png"}
      />
    </Head>
  );
};

export default NextHead;
