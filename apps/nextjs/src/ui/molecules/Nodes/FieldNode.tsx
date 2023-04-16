import { useUser } from "@clerk/nextjs";
import { Handle, Position, Node, NodeProps } from "reactflow";
import useStore from "store";

export default function FieldNode(
  node: NodeProps & { data: { label: string; description: string } },
) {
  const { isSignedIn } = useUser();
  const { addChildNode } = useStore((state) => ({
    addChildNode: state.addChildNode,
  }));
  // const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  const handleClick = () => {
    addChildNode(
      node as unknown as Node<{
        label: string;
        description: string;
        syllabus: string[];
      }>,
      { x: 150, y: 250 },
    );
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="flex h-40 w-40 items-center justify-center rounded-full border-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex flex-col items-center">
          <h4 className="mt-12 text-white">{node.data.label}</h4>
          {isSignedIn ? (
            <button
              onClick={handleClick}
              className="mt-8 text-gray-500 hover:text-white"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
