import type { NextPage } from "next";
import MarketingLayout from "../layouts/MarketingLayout";
import Head from "../ui/atoms/Head";
import ReactFlow, {
  Controls,
  Node,
  Edge,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useState, useCallback } from "react";
import { useMemo } from "react";
import FieldNode from "../ui/molecules/Nodes/FieldNode";
import CourseNode from "../ui/molecules/Nodes/CourseNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "fieldNode",
    data: { label: "The Academy" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "fieldNode",
    data: { label: "Sciences" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "fieldNode",
    data: { label: "Engineering" },
    position: { x: 200, y: 200 },
  },
  {
    id: "4",
    type: "fieldNode",
    data: { label: "Computer Science" },
    position: { x: 300, y: 300 },
  },
  {
    id: "5",
    type: "fieldNode",
    data: { label: "Arts & Humanities" },
    position: { x: -100, y: -100 },
  },
  {
    id: "6",
    type: "courseNode",
    data: {
      label: "Computer Science 101",
      description:
        "This course is an introduction to computer science, covering the basics of programming, algorithms, data structures, and computer systems.",
    },
    position: { x: 400, y: 400 },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2" },
  { id: "1-5", source: "1", target: "5" },
  { id: "2-3", source: "2", target: "3" },
  { id: "3-4", source: "3", target: "4" },
  { id: "4-6", source: "4", target: "6" },
];

const Home: NextPage = () => {
  const nodeTypes = useMemo(
    () => ({ fieldNode: FieldNode, courseNode: CourseNode }),
    [],
  );

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  return (
    <>
      <Head />
      <MarketingLayout>
        <div style={{ height: "80vh" }}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </MarketingLayout>
    </>
  );
};

export default Home;
