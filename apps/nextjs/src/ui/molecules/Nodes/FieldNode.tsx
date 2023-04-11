import { Handle, Position } from "reactflow";

export default function FieldNode({ data }: { data: { label: string } }) {
  // const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="flex h-40 w-40 items-center justify-center rounded-full border-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
        <h4 className="text-white ">{data.label}</h4>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
