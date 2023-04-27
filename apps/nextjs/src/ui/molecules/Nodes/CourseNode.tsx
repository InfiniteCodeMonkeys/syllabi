import { User } from "@acme/db";
import { useAuth } from "@clerk/nextjs";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import useStore, { RootState } from "store";
import { trpc } from "utils/trpc";

export default function CourseNode({
  id,
  data,
}: {
  id: string;
  data: { label: string; description: string };
}) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const user = trpc.user.get.useQuery().data as unknown as User;
  const saveLike = trpc.user.like.useMutation();
  const removeLike = trpc.user.unlike.useMutation();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const setCourseModalOpen = useStore(
    (state: RootState) => state.setCourseModalOpen,
  );

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      setLiked(!liked);

      if (!liked) {
        return removeLike.mutateAsync({ id });
      }
      saveLike.mutateAsync({ id });
    }
  };

  const handleOpenCourseModal = () => {
    setCourseModalOpen(id);
  };

  useEffect(() => {
    if (user?.savedCourses.includes(id)) {
      setLiked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className={clsx(
          "rounded-md bg-gradient-to-r from-indigo-700 to-indigo-600",
          !expanded ? "w-68" : "w-88",
        )}
      >
        <div className="flex items-center justify-between p-2">
          <h4 className="mr-2 text-white">{data.label}</h4>
          <div className="mt-2">
            {!liked ? (
              <button
                type="button"
                className="mr-2 text-white hover:text-pink-600"
                onClick={handleLike}
              >
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                className="mr-2 text-pink-600"
                onClick={handleLike}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </button>
            )}
            {!expanded ? (
              <button
                type="button"
                onClick={handleExpand}
                className="text-white"
              >
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
            ) : (
              <button
                type="button"
                onClick={handleExpand}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.22 3.22a.75.75 0 011.06 0l3.97 3.97V4.5a.75.75 0 011.5 0V9a.75.75 0 01-.75.75H4.5a.75.75 0 010-1.5h2.69L3.22 4.28a.75.75 0 010-1.06zm17.56 0a.75.75 0 010 1.06l-3.97 3.97h2.69a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75V4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0zM3.75 15a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-2.69l-3.97 3.97a.75.75 0 01-1.06-1.06l3.97-3.97H4.5a.75.75 0 01-.75-.75zm10.5 0a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-2.69l3.97 3.97a.75.75 0 11-1.06 1.06l-3.97-3.97v2.69a.75.75 0 01-1.5 0V15z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {expanded ? (
          <div className="h-42 w-80 border-t-2 border-t-gray-400 p-2">
            <span className="text-white">
              <b>Course Description:</b> {data.description}
            </span>
            <div className="flex items-center justify-center p-2">
              <button onClick={handleOpenCourseModal}>
                <span className="text-white underline">Course Syllabus</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
