import { nanoid } from "nanoid";
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
} from "reactflow";
import { create } from "zustand";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: "1",
      type: "academyNode",
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
  ],
  edges: [
    { id: "1-2", source: "1", target: "2" },
    { id: "1-5", source: "1", target: "5" },
    { id: "2-3", source: "2", target: "3" },
    { id: "3-4", source: "3", target: "4" },
    { id: "4-6", source: "4", target: "6" },
  ],

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addChildNode: (parentNode: Node, position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type: "mindmap",
      data: { label: "New Node" },
      position,
      parentNode: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },
  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },
}));

export default useStore;
