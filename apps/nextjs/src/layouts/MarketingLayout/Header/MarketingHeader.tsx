import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "utils/trpc";

const MarketingHeader = () => {
  const { isSignedIn } = useUser();
  const { data } = trpc.user.get.useQuery();

  const navigation = [
    { name: "How does this work?", onClick: () => console.log("Clicked") },
    { name: "Contribute", onClick: () => console.log("Clicked") },
  ];

  return (
    <Popover as="header" className="relative z-40">
      <div className=" h-16 bg-gradient-to-r from-gray-900 to-gray-700 ">
        <nav
          className="relative flex h-full items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/">
                <>
                  <span className="sr-only">LegisGPT</span>
                  <h1 className=" text-2xl font-bold text-white">LegisGPT</h1>
                </>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          {isSignedIn ? (
            <div className="hidden items-center md:flex md:items-center md:space-x-6">
              <UserButton />
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/sign-in">
                <button className="text-base font-medium text-white hover:text-gray-300">
                  Log in
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="inline-flex items-center  rounded-md border border-transparent bg-gradient-to-r from-orange-600 to-pink-500 px-4 py-2 pb-3 text-base font-medium text-white hover:bg-gray-700">
                  Sign Up Free
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-gray-900 shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-4 pt-4">
              <div>
                <span className="sr-only">AnnoPod</span>
                <Image
                  className="h-8 w-auto sm:h-10"
                  layout="fill"
                  src="/logo_short.png"
                  alt="AnnoPod Logo"
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="pb-6 pt-5">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:underline"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              {isSignedIn ? (
                <>
                  <div className="space-y-1 px-2">
                    <Link href="/dashboard">
                      <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:underline">
                        Dashboard
                      </span>
                    </Link>
                    <Link href="/dashboard/settings">
                      <span className="block rounded-md px-3 py-2 text-base font-medium text-white hover:underline">
                        Settings
                      </span>
                    </Link>
                  </div>
                  <div className="mt-6 px-5">
                    <Link
                      href="/auth/new-user"
                      className="block w-full rounded-md border-transparent bg-red-500 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700"
                    >
                      Logout
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-6 px-5">
                    <Link
                      href="/sign-up"
                      className="block w-full rounded-md border-transparent bg-gradient-to-r from-orange-600 to-pink-500 px-4 py-3 text-center font-medium text-white shadow hover:bg-gray-700"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                  <div className="mt-6 px-5">
                    <p className="text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <Link
                        href="/sign-in"
                        className="text-white hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MarketingHeader;
