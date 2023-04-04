import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Example() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleClick = () => {
    // TODO: query params
    router.push(`/sign-in?email=${email}`);
  };
  return (
    <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
            <div className="lg:py-24">
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                <span className="block">A better way to</span>
                <span className="block bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text pb-3 text-transparent sm:pb-5">
                  follow podcasts
                </span>
              </h1>
              <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                Never miss something interesting in any of your favorite
                podcasts. All 200 of them. Set interest trackers. Get
                transcripts. Read or listen to the important bits.
              </p>
              <div className="mt-10 sm:mt-12">
                <div className="sm:mx-auto sm:max-w-xl lg:mx-0">
                  <div className="sm:flex">
                    <div className="min-w-0 flex-1">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.currentTarget.value);
                        }}
                        placeholder="Enter your email"
                        className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        type="button"
                        onClick={handleClick}
                        className="block w-full rounded-md bg-gradient-to-r from-orange-600 to-pink-500 py-3 px-4 font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                      >
                        Sign Up Free
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                    Start your free 14-day trial, no credit card necessary. By
                    providing your email, you agree to our{" "}
                    <a href="#" className="font-medium text-white">
                      terms of service
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 -mb-16 hidden lg:relative lg:m-0 lg:flex">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <Image
                layout="fill"
                className="skew-y-12 transform"
                src="/collage2.png"
                alt="collage of podcast logos"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
