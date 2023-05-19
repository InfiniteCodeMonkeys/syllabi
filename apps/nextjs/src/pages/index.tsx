import type { NextPage } from "next";

import MarketingLayout from "../layouts/MarketingLayout";
import Head from "../ui/atoms/Head";
import Flow from "../ui/organisms/Flow";

import "reactflow/dist/style.css";
import CourseModal from "ui/molecules/Modals/CourseModal";
import useStore, { RootState } from "store";
import SuggestCourseModal from "ui/molecules/Modals/SuggestCourseModal";
import HowWorkModal from "ui/molecules/Modals/HowDoesThisWorkModal";
import AdminModal from "ui/molecules/Modals/AdminModal";

const Home: NextPage = () => {
  const { courseModalOpen, howWorkModalOpen, adminModalOpen } = useStore(
    (state: RootState) => ({
      courseModalOpen: state.courseModalOpen,
      howWorkModalOpen: state.howWorkModalOpen,
      adminModalOpen: state.adminModalOpen,
    }),
  );
  return (
    <>
      <Head />
      <MarketingLayout>
        <>
          <Flow />
          <CourseModal courseModalOpen={courseModalOpen} />
          <SuggestCourseModal />
          {howWorkModalOpen ? <HowWorkModal /> : null}
          {adminModalOpen ? <AdminModal /> : null}
        </>
      </MarketingLayout>
    </>
  );
};

export default Home;
