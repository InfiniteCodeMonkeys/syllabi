import MarketingLayout from "layouts/MarketingLayout";
import Head from "../../ui/atoms/Head";
import { useRouter } from "next/router";
import React from "react";
import Flow from "ui/organisms/Flow";

const Subject = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head />
      <MarketingLayout>
        <main className="h-[80vh]">
          <Flow id={id as string} />
        </main>
      </MarketingLayout>
    </>
  );
};

export default Subject;
