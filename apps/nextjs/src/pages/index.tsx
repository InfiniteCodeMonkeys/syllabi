import type { NextPage } from "next";

import MarketingLayout from "../layouts/MarketingLayout";
import Head from "../ui/atoms/Head";
import Flow from "../ui/organisms/Flow";

import "reactflow/dist/style.css";
import CourseModal from "ui/molecules/Modals/CourseModal";
import useStore, { RootState } from "store";
import SuggestCourseModal from "ui/molecules/Modals/SuggestCourseModal";

const Home: NextPage = () => {
  const courseModalOpen = useStore((state: RootState) => state.courseModalOpen);
  return (
    <>
      <Head />
      <MarketingLayout>
        <>
          <Flow />
          <CourseModal courseModalOpen={courseModalOpen} />
          <SuggestCourseModal />
        </>
      </MarketingLayout>
    </>
  );
};

export default Home;
