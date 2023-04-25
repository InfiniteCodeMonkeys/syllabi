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
  filterNodes: (node: any) => void;
  filteredNodes: boolean;
  updateFilteredNodes: (filteredNodes: boolean) => void;
  courseModalOpen: string;
  setCourseModalOpen: (id: string) => void;
};

const useStore = create<RootState>((set, get) => ({
  ...createFlowSlice(set, get),
  ...createUISlice(set, get),
}));

export default useStore;
