import type { NextPage } from "next";

import MarketingLayout from "../layouts/MarketingLayout";
import Head from "../ui/atoms/Head";
import Flow from "../ui/organisms/Flow";

import "reactflow/dist/style.css";
import CourseModal from "ui/molecules/Modals/CourseModal";
import useStore, { RootState } from "store";

const Home: NextPage = () => {
  const courseModalOpen = useStore((state: RootState) => state.courseModalOpen);
  return (
    <>
      <Head />
      <MarketingLayout>
        <>
          <Flow />
          <CourseModal courseModalOpen={courseModalOpen} />
        </>
      </MarketingLayout>
    </>
  );
};

export default Home;
