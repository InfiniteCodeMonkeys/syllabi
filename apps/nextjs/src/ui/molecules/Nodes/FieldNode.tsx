import { Handle, Position } from "reactflow";

export default function TextUpdaterNode({ data }: { data: any }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white">
        <h4>{data.label}</h4>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
