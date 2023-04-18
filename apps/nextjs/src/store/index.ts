import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  XYPosition,
} from "reactflow";
import { create } from "zustand";
import { createFlowSlice } from "./slices/createFlowSlice";
import { createUISlice } from "./slices/createUISlice";

export type RootState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  updateNodes: (nodes: Node[]) => void;
  updateEdges: (edges: Edge[]) => void;
  courseModalOpen: {
    id: string;
    data: { label: string; description: string };
  };
  setCourseModalOpen: (arg0: {
    id: string;
    data: { label: string; description: string };
  }) => void;
};

const useStore = create<RootState>((set, get) => ({
  ...createFlowSlice(set, get),
  ...createUISlice(set, get),
}));

export default useStore;
