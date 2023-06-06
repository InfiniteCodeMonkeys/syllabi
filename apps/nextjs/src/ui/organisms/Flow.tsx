import { useEffect, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  NodeOrigin,
  ConnectionLineType,
  StraightEdge,
} from "reactflow";
import { shallow } from "zustand/shallow";
import useStore, { RootState } from "../../store";
import FieldNode from "../molecules/Nodes/FieldNode";
import CourseNode from "../molecules/Nodes/CourseNode";
import AcademyNode from "../molecules/Nodes/AcademyNode";
// we have to import the React Flow styles for it to work
import "reactflow/dist/style.css";
import { trpc } from "utils/trpc";

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "straight" };

function Flow({ id }: { id: string }) {
  const nodesAndEdges = trpc.nodes.get.useQuery({
    id,
    refetchOnWindowFocus: false,
  }).data as unknown as any;

  const selector = (state: RootState) => ({
    nodes: state.nodes,
    edges: state.edges,
    updateNodes: state.updateNodes,
    updateEdges: state.updateEdges,
    filteredNodes: state.filteredNodes,
  });
  const { nodes, edges, updateNodes, updateEdges, filteredNodes } = useStore(
    selector,
    shallow,
  );

  const nodeTypes = useMemo(
    () => ({
      fieldNode: FieldNode,
      courseNode: CourseNode,
      academyNode: AcademyNode,
    }),
    [],
  );

  const edgeTypes = useMemo(() => ({ straight: StraightEdge }), []);

  useEffect(() => {
    if (filteredNodes === false) {
      updateNodes(nodesAndEdges?.nodes);
      updateEdges(nodesAndEdges?.edges);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesAndEdges, filteredNodes]);

  return (
    <div style={{ height: "80vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        nodeOrigin={nodeOrigin}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        connectionLineType={ConnectionLineType.Straight}
        defaultViewport={{ x: 900, y: 300, zoom: 0 }}
        snapToGrid={true}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
