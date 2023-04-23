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

export const createFlowSlice = (
  set: (arg0: any) => void,
  get: () => RootState,
) => ({
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
  filterNodes: (nodeFromProps: Node) => {
    const filterStatus = get().filteredNodes;

    if (filterStatus === false) {
      set({ filteredNodes: true });

      const edgeArray = [...get().edges];
      const nodeArray = [...get().nodes];

      const formattedNode = nodeArray.filter(
        (node) => node.id === nodeFromProps.id,
      );
      const newNodesArray = [formattedNode[0]];

      const getParents = (node) => {
        const parentEdges = edgeArray.filter((edge) => edge.target === node.id);

        parentEdges.forEach((edge) => {
          const parents = nodeArray.filter((node) => node.id === edge.source);
          newNodesArray.push(...parents);

          parents.forEach((parent) => {
            getParents(parent);
          });
        });
      };

      const getChildren = (node) => {
        const childrenEdges = edgeArray.filter(
          (edge) => edge.source === node.id,
        );

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

      set({
        nodes: newNodesArray,
      });
    } else {
      set({ filteredNodes: false });
    }
  },
  filteredNodes: false,
});
