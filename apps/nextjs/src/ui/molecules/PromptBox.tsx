import React from "react";
import Image from "next/image";
import sendImage from "../../assets/send.svg";

interface PromptBoxProps {
  prompt: string;
  handlePromptChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  placeHolderText?: string;
  buttonText?: string;
  error?: string;
  disableButton?: boolean;
  labelText?: string;
}

const PromptBox = ({
  prompt,
  handlePromptChange,
  handleSubmit,
  placeHolderText,
  buttonText,
  error,
  disableButton,
  labelText,
}: PromptBoxProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div className="mb-4 flex items-center">
        {labelText && (
          <label htmlFor="" className="mr-4">
            {labelText}
          </label>
        )}

        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          placeholder={placeHolderText ?? "Enter your prompt"}
          className="mr-4 w-full rounded-lg bg-white px-4 py-2 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {!disableButton && (
          <button
            onClick={handleSubmit}
            className={` flex rounded-lg bg-white px-4 py-2 font-semibold uppercase text-gray-900 shadow transition-colors duration-200 hover:shadow-xl `}
          >
            {buttonText ?? "Enter"}
            <div
              className={`relative ml-2  mt-[3px] h-5 w-5 items-center overflow-hidden`}
            >
              <Image
                src={sendImage}
                alt="send"
                width={32}
                height={32}
                priority
                unoptimized
              />
            </div>
          </button>
        )}
      </div>
      <p className={`text-red-500 ${error ? "block" : "hidden"}`}>{error}</p>
    </>
  );
};

export default PromptBox;
