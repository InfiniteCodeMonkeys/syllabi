import { useUser } from "@clerk/nextjs";
import { Handle, Position, Node, NodeProps, Edge } from "reactflow";
import useStore from "store";
import { trpc } from "utils/trpc";

export default function FieldNode(
  node: NodeProps & { data: { name: string; description: string } },
) {
  const { isSignedIn } = useUser();
  const nodesFromTRPC = trpc.nodes.get.useQuery({});
  const {
    addChildNode,
    filterNodes,
    filteredNodes,
    updateNodes,
    updateEdges,
    updateFilteredNodes,
  } = useStore((state) => ({
    addChildNode: state.addChildNode,
    filterNodes: state.filterNodes,
    filteredNodes: state.filteredNodes,
    updateNodes: state.updateNodes,
    updateEdges: state.updateEdges,
    updateFilteredNodes: state.updateFilteredNodes,
  }));

  const data = nodesFromTRPC?.data as unknown as {
    nodes: Node[];
    edges: Edge[];
  };

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

  const handleNodeClick = () => {
    if (!filteredNodes) {
      filterNodes(node);
    } else {
      updateFilteredNodes(false);
      updateNodes(data?.nodes);
      updateEdges(data?.edges);
    }
  };

  return (
    <button onClick={handleNodeClick}>
      <Handle type="target" position={Position.Top} />
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex flex-col items-center justify-between">
          <span className="text-center text-[6px] text-white">
            {node.data.name}
          </span>
        </div>
        <div className=" absolute bottom-0 ">
          {isSignedIn ? (
            <button
              onClick={handleClick}
              className="mt-4 text-gray-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
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
    </button>
  );
}
