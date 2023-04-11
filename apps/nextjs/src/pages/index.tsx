import type { NextPage } from "next";

import MarketingLayout from "../layouts/MarketingLayout";
import Head from "../ui/atoms/Head";
import Flow from "../ui/organisms/Flow";

import "reactflow/dist/style.css";

const Home: NextPage = () => {
  return (
    <>
      <Head />
      <MarketingLayout>
        <Flow />
      </MarketingLayout>
    </>
  );
};

export default Home;
