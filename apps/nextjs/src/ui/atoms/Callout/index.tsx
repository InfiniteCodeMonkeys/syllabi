import Link from "next/link";

export default function CenterCTA() {
  return (
    <div className="my-4 border-t-2 border-slate-500 bg-gradient-to-r from-gray-900 to-gray-700">
      <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">So many great podcasts. So little time.</span>
          <span className="block">
            Get alerts when they talk about your interests.
          </span>
        </h2>
        <div className="mt-8 flex justify-center">
          <button className="block rounded-md bg-gradient-to-r from-orange-600 to-pink-500 py-3 px-4 font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900">
            <Link href="/auth/signin">
              <span>Get started for free</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
