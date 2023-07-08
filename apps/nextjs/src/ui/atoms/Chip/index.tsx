import React from "react";
import Image from "next/image";
import closeIcon from "../../../assets/close.svg";

const Chip = ({ label = "chip" }) => {
  return (
    <div className="inline-block h-8 w-auto items-center rounded-full bg-slate-500 px-3 pt-[2px]">
      <div className="flex items-center">
        <span className="text-white">{label}</span>
        <button
          className={`relative ml-2 mt-1  h-4 w-4 items-center overflow-hidden `}
        >
          <Image
            src={closeIcon}
            alt="close"
            width={32}
            height={32}
            priority
            unoptimized
          />
        </button>
      </div>
    </div>
  );
};

export default Chip;
