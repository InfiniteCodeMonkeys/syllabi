import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStore, { RootState } from "store";
import { trpc } from "utils/trpc";

const AdminModal = () => {
  const newCourse = trpc.seed.seed.useMutation();
  const getProgression = trpc.courses.newProgression.useMutation();
  const { setAdminModalOpen } = useStore((state: RootState) => ({
    setAdminModalOpen: state.setAdminModalOpen,
  }));

  const cancelButtonRef = useRef(null);

  const handleSubmit = async () => {
    const response = await newCourse.mutateAsync();
    console.log(response);
  };

  const handleProgression = async () => {
    const response = await getProgression.mutateAsync();
    console.log(response);
  };
  return (
    <>
      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setAdminModalOpen(false)}
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
                        Admin Portal
                      </Dialog.Title>
                      <button
                        type="button"
                        onClick={() => setAdminModalOpen(false)}
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
                        <div className="flex justify-end">
                          <button
                            onClick={handleSubmit}
                            className="alrounded-md mt-2 block rounded-md border-transparent bg-gradient-to-r from-orange-600 to-pink-500 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700"
                          >
                            Seed Database
                          </button>
                          <button
                            onClick={handleProgression}
                            className="alrounded-md ml-4 mt-2 block rounded-md border-transparent bg-gradient-to-r from-orange-600 to-pink-500 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700"
                          >
                            Get Progression
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AdminModal;
