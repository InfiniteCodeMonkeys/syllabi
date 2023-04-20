import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStore, { RootState } from "store";
import { trpc } from "utils/trpc";
import Link from "next/link";

const CourseModal = ({ courseModalOpen }: { courseModalOpen: string }) => {
  const course = trpc.courses.get.useQuery({ id: courseModalOpen });
  const setCourseModalOpen = useStore(
    (state: RootState) => state.setCourseModalOpen,
  );
  const cancelButtonRef = useRef(null);

  return (
    <>
      {courseModalOpen && course.data ? (
        <Transition.Root show={true} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={() => setCourseModalOpen("")}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative w-80 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 lg:max-w-[900px]">
                    <div>
                      <div className="flex justify-between">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {course.data.name}
                        </Dialog.Title>
                        <button
                          type="button"
                          onClick={() => setCourseModalOpen("")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-3 h-96 overflow-y-auto sm:mt-5">
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {course.data.description}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-500">
                            <b>Course Syllabus:</b>
                          </p>
                        </div>
                        {course.data.syllabus.weeks.map(
                          (item, index: number) => (
                            <>
                              <div className="mt-6" key={index}>
                                <p className="text-sm text-gray-500">
                                  <b>
                                    Week {item.week}:{" "}
                                    {item.topics.map(
                                      (topic: string, index: number) => (
                                        <>
                                          {item.topics.length === 1 ||
                                          index + 1 === item.topics.length ? (
                                            <span key={index}>{topic} </span>
                                          ) : (
                                            <span key={index}>{topic}, </span>
                                          )}
                                        </>
                                      ),
                                    )}
                                  </b>
                                </p>
                                <div>
                                  <p className="mt-2 text-xs text-gray-500">
                                    <b>Readings</b>
                                  </p>
                                  {item.readings.map(
                                    (
                                      reading: {
                                        link: string;
                                        chapters: string[];
                                        book: string;
                                        author: string;
                                      },
                                      index: number,
                                    ) => (
                                      <Link href={reading.link} key={index}>
                                        {reading.chapters.map(
                                          (chapter: string, index: number) => (
                                            <p
                                              className="text-sm text-gray-500"
                                              key={index}
                                            >
                                              <span className="underline">
                                                {chapter}
                                              </span>{" "}
                                              of {reading.book} By:{" "}
                                              {reading.author}
                                            </p>
                                          ),
                                        )}
                                      </Link>
                                    ),
                                  )}
                                </div>
                                {item.videos.length ? (
                                  <div>
                                    <p className="mt-2 text-xs text-gray-500">
                                      <b>Videos</b>
                                    </p>
                                    {item.videos.map(
                                      (
                                        video: {
                                          title: string;
                                          link: string;
                                          author: string;
                                        },
                                        index: number,
                                      ) => (
                                        <Link href={video.link} key={index}>
                                          <p
                                            className="text-sm text-gray-500"
                                            key={index}
                                          >
                                            <span className="underline">
                                              {video.title}
                                            </span>{" "}
                                            By: {video.author}
                                          </p>
                                        </Link>
                                      ),
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            </>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"></div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </>
  );
};

export default CourseModal;
