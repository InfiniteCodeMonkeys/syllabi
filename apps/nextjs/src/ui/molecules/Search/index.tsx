import React, { useState, KeyboardEvent, ReactElement } from "react";
import ReactTypingEffect from "react-typing-effect";
import { useRouter } from "next/router";

const SearchBox = (): ReactElement => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [input, setInput] = useState(false);

  const placeholders = [
    "Computer Science",
    "US History",
    "Math",
    "Product Design",
    "Creative Writing",
  ];

  const postRequest = async () => {
    router.push(`/?value=${value}`);
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
          className="w-full bg-transparent pb-3 pl-2 pt-3 text-gray-800 outline-none"
        />
      ) : (
        <div className="mb-1 w-[355px]">
          <ReactTypingEffect
            text={placeholders}
            speed={200}
            eraseSpeed={150}
            className="w-full bg-transparent pb-2 pl-2 pt-3 text-gray-800"
          />
        </div>
      )}

      <button onClick={postRequest} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-1 h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
