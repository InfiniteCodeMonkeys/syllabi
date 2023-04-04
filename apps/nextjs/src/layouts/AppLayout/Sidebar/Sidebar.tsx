/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";

export function SideBar({ podcast }) {
  return (
    <div className="h-full bg-gray-900 lg:flex lg:w-16 lg:items-start ">
      <div>
        <div className="border-r-slate-500 pt-4 pl-4">
          <span className="sr-only">AnnoPod</span>
          <Link href="/">
            <Image
              height={50}
              width={50}
              src="/logo_short.png"
              alt="AnnoPod Logo"
            />
          </Link>
        </div>
        <div className="hidden min-h-full lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-300">
            {podcast.publisher}
          </span>
        </div>
      </div>
    </div>
  );
}
