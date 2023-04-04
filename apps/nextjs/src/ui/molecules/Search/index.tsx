import React, { useState, KeyboardEvent, ReactElement } from "react";
import ReactTypingEffect from "react-typing-effect";
import { Search } from "tabler-icons-react";
import { useRouter } from "next/router";

const SearchBox = (): ReactElement => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [input, setInput] = useState(false);

  const placeholders = [
    "Philosphy Bites",
    "The Joe Rogan Experience",
    "Pod Save America",
    "How I Built This with Guy Raz",
    "Crime Junkie",
    "The Daily",
    "Office Ladies",
    "Stuff You Should Know",
  ];

  const postRequest = async () => {
    router.push(`/podcasts?value=${value}`);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      postRequest();
    }
  };

  return (
    <div
      onMouseOver={() => setInput(true)}
      className="hidden max-h-[44px] justify-between rounded-lg border-2 border-[#667778] bg-white p-[3px] focus:border-white md:flex md:w-[320px] lg:w-[420px]"
    >
      {input ? (
        <input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent pt-3 pb-3 pl-2 text-gray-800 outline-none"
        />
      ) : (
        <div className="mb-1 w-[355px]">
          <ReactTypingEffect
            text={placeholders}
            speed={200}
            eraseSpeed={150}
            className="w-full bg-transparent pt-3 pb-2 pl-2 text-gray-800"
          />
        </div>
      )}

      <button onClick={postRequest} type="button">
        <Search
          size={22}
          onClick={postRequest}
          className="mr-1 text-[#667778] hover:text-white"
        />
      </button>
    </div>
  );
};

export default SearchBox;
