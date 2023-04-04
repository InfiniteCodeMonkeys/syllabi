import React from "react";
import AppHeader from "./Header/AppHeader";
import { TinyWaveFormIcon } from "../../ui/atoms/Icons";
import ComboboxwithCloud from "../../ui/molecules/Combobox";
import data from "../../data/genres.json";
import { useRouter } from "next/router";

const AppLayout = ({ children }) => {
  const router = useRouter();
  const onComboChange = (value) => {
    router.push(`/podcasts?category=${value.id}`);
  };
  return (
    <div className="w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 lg:min-h-full">
      <div className="h-18">
        <AppHeader />
      </div>
      <div className="w-full">
        <div className="flex h-full flex-col lg:flex-row">
          <div className="lg:min-w-[20%]">
            <div className="relative mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-r-2 lg:border-slate-500 lg:px-8 xl:px-12">
              <section className="mt-10 lg:mt-12">
                <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
                  <TinyWaveFormIcon
                    colors={["fill-indigo-300", "fill-blue-300"]}
                    className="h-2.5 w-2.5"
                  />
                  <span className="ml-2.5 text-slate-200">Categories</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
                <div className="mt-4">
                  <ComboboxwithCloud data={data} onChange={onComboChange} />
                </div>
              </section>
            </div>
          </div>
          <main className="h-full lg:w-[80%]">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
