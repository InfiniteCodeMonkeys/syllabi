import React from "react";
import Head from "next/head";
import getDarkMode from "../../../helpers/useDarkMode";

const NextHead = () => {
  const isDarkMode = getDarkMode();

  return (
    <Head>
      <title>AnnoPod</title>
      <meta
        name="description"
        content="Get transcripts and interest analysis for your favorite podcasts."
      />
      <link
        rel="icon"
        href={isDarkMode ? "/logo_short.png" : "/logo_short_black.png"}
      />
    </Head>
  );
};

export default NextHead;
