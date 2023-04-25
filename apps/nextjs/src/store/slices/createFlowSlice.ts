import { nanoid } from "nanoid";
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
} from "reactflow";
import { RootState } from "store";

const initialArray = [
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
];

export const createFlowSlice = (
  set: (arg0: any) => void,
  get: () => RootState,
) => ({
  nodes: initialArray,
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
      nodes: get().nodes.map((node: { id: string; data: any }) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },

  updateNodes: (nodes: Node[]) => {
    set({
      nodes: initialArray.concat(nodes),
    });
  },
  updateEdges: (edges: Edge[]) => {
    set({
      edges: edges,
    });
  },
  filterNodes: (nodeFromProps: Node) => {
    set({ filteredNodes: true });

    let edgeArray = [...get().edges];
    let nodeArray = [...get().nodes];

    const formattedNode = nodeArray.filter(
      (node) => node.id === nodeFromProps.id,
    );
    let newNodesArray = [formattedNode[0]];

    const getParents = (node: any) => {
      const parentEdges = edgeArray.filter((edge) => edge.target === node.id);

      parentEdges.forEach((edge) => {
        const parents = nodeArray.filter((node) => node.id === edge.source);
        console.log("parents", parents);
        newNodesArray.push(...parents);

        parents.forEach((parent) => {
          getParents(parent);
        });
      });
    };

    const getChildren = (node: any) => {
      const childrenEdges = edgeArray.filter((edge) => edge.source === node.id);

      childrenEdges.forEach((edge) => {
        const children = nodeArray.filter((node) => node.id === edge.target);
        newNodesArray.push(...children);

        children.forEach((child) => {
          getChildren(child);
        });
      });
      return;
    };

    getParents(formattedNode[0]);
    getChildren(formattedNode[0]);

    set({ nodes: [] });

    set({
      nodes: newNodesArray,
    });

    newNodesArray = [];
    nodeArray = [];
    edgeArray = [];
    set({ filteredNodes: true });
  },
  filteredNodes: false,
  updateFilteredNodes: (filteredNodes: boolean) => {
    set({ filteredNodes });
  },
});
