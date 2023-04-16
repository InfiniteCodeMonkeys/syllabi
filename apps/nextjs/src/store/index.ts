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
  updateNodeLabel: (nodeId: string, label: string) => void;
  updateNodes: (nodes: Node[]) => void;
  updateEdges: (edges: Edge[]) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: "clggtsotk0004p0eqk2lfm793",
      type: "academyNode",
      data: {
        label: "The Academy",
        description: "The Body of Human Knowledge",
        syllabus: [],
      },
      position: { x: 200, y: 200 },
    },
  ],
  edges: [],

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
      type: "courseNode",
      data: { label: "New Course" },
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

  updateNodes: (nodes: Node[]) => {
    const nodesArray = [...get().nodes];

    nodes?.forEach((node) => {
      nodesArray.push(node);
    });

    set({ nodes: nodesArray });
  },
  updateEdges: (edges: Edge[]) => {
    set({
      edges: edges,
    });
  },
}));

export default useStore;
