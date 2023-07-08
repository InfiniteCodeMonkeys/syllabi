import React, { useState } from "react";
import SearchResult from "ui/molecules/SearchResult";
import { trpc } from "utils/trpc";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = trpc.congress.getBills.useQuery({ congress: "118" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <div className="mb-4 mt-6 flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for a bill"
          className="ml-4 mr-4 w-full rounded-lg bg-white px-4 py-2 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="flex rounded-lg bg-white px-4 py-2 font-semibold uppercase text-gray-900 shadow transition-colors duration-200 hover:shadow-xl"
        >
          Search
        </button>
      </div>
      <div className="ml-4 text-left">
        <ul>
          {data?.result &&
            data?.result.map((bill) => (
              <SearchResult key={bill.url} bill={bill} />
            ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
