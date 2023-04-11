import { Handle, Position } from "reactflow";

export default function AcademyNode({ data }: { data: { label: string } }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="flex h-52 w-52 items-center justify-center rounded-full border-transparent bg-gradient-to-r from-orange-600 to-pink-500 ">
        <h4 className="text-white ">{data.label}</h4>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
