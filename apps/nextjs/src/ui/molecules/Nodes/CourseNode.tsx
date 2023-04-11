import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { Handle, Position } from "reactflow";

export default function CourseNode({
  data,
}: {
  data: { label: string; description: string; id: string };
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={clsx("rounded-md bg-white", !expanded ? "w-60" : "w-80")}>
        <div className="flex items-center justify-between  p-2">
          <h4>{data.label}</h4>
          <button type="button" onClick={handleExpand}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </button>
        </div>
        {expanded ? (
          <div className="h-42 w-80 border-t-2 border-t-gray-400 p-2">
            <span>
              <b>Course Description:</b> {data.description}
            </span>
            <div className="flex items-center justify-center p-2">
              <Link href={`courses/${data.id}`}>
                <span className=" text-blue-500 underline">
                  Course Syllabus
                </span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
