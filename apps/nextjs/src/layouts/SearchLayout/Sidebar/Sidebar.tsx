/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";

export function SideBar() {
  return (
    <div className="bg-gray-900 lg:flex lg:w-16 lg:items-start ">
      <div>
        <div className="hidden min-h-full lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-300">
            Filters
          </span>
        </div>
      </div>
    </div>
  );
}
