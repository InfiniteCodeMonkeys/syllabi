import React from "react";
import Head from "next/head";
import getDarkMode from "../../../helpers/useDarkMode";

const NextHead = () => {
  const isDarkMode = getDarkMode();

  return (
    <Head>
      <title>theSyllabi</title>
      <meta
        name="description"
        content="Find the best curriculum for whatever you want to learn."
      />
      <link
        rel="icon"
        href={isDarkMode ? "/logo_short.png" : "/logo_short_black.png"}
      />
    </Head>
  );
};

export default NextHead;
