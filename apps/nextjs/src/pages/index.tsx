import type { NextPage } from "next";
import MarketingLayout from "../layouts/MarketingLayout";
import Head from "../ui/atoms/Head";
import CourseModal from "ui/molecules/Modals/CourseModal";
import useStore, { RootState } from "store";
import SuggestCourseModal from "ui/molecules/Modals/SuggestCourseModal";
import HowWorkModal from "ui/molecules/Modals/HowDoesThisWorkModal";
import AdminModal from "ui/molecules/Modals/AdminModal";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import dynamic from "next/dynamic";
import { data } from "ui/organisms/data";
import { trpc } from "utils/trpc";
const Treemap = dynamic(() => import("ui/organisms/MapView/Treemap/Treemap"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { courseModalOpen, howWorkModalOpen, adminModalOpen } = useStore(
    (state: RootState) => ({
      courseModalOpen: state.courseModalOpen,
      howWorkModalOpen: state.howWorkModalOpen,
      adminModalOpen: state.adminModalOpen,
    }),
  );
  // const data = trpc.nodes.get.useQuery({ refetchOnWindowFocus: false })
  //   .data as unknown as any;

  return (
    <>
      <Head />
      <MarketingLayout>
        <>
          <main className="h-[80vh]">
            <ParentSize>
              {({ width, height }) => (
                <Treemap width={width} height={height} data={data} />
              )}
            </ParentSize>
          </main>

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
