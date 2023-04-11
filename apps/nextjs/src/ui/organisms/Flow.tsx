import { useCallback, useMemo, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  NodeOrigin,
  ConnectionLineType,
  StraightEdge,
  OnConnectEnd,
  OnConnectStart,
  useStoreApi,
  useReactFlow,
} from "reactflow";
import { shallow } from "zustand/shallow";
import useStore, { RFState } from "../../store";
import FieldNode from "../molecules/Nodes/FieldNode";
import CourseNode from "../molecules/Nodes/CourseNode";
import AcademyNode from "../molecules/Nodes/AcademyNode";
// we have to import the React Flow styles for it to work
import "reactflow/dist/style.css";

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

function Flow() {
  const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    addChildNode: state.addChildNode,
  });
  // whenever you use multiple values, you should use shallow to make sure the component only re-renders when one of the values changes
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
    selector,
    shallow,
  );
  const connectingNodeId = useRef<string | null>(null);
  const store = useStoreApi();
  const { project } = useReactFlow();

  const getChildNodePosition = (event: MouseEvent, parentNode?: any) => {
    const { domNode } = store.getState();

    if (!domNode) {
      return;
    }

    const { top, left } = domNode.getBoundingClientRect();

    // we need to remove the wrapper bounds, in order to get the correct mouse position
    const panePosition = project({
      x: event.clientX - left,
      y: event.clientY - top,
    });

    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x:
        panePosition.x - parentNode?.positionAbsolute.x + parentNode?.width / 2,
      y:
        panePosition.y -
        parentNode?.positionAbsolute.y +
        parentNode?.height / 2,
    };
  };

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = store.getState();
      const targetIsPane = (event.target as Element).classList.contains(
        "react-flow__pane",
      );

      if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(
          event as MouseEvent,
          parentNode,
        );

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getChildNodePosition],
  );

  const nodeTypes = useMemo(
    () => ({
      fieldNode: FieldNode,
      courseNode: CourseNode,
      academyNode: AcademyNode,
    }),
    [],
  );

  const edgeTypes = {
    straight: StraightEdge,
  };

  return (
    <div style={{ height: "80vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeOrigin={nodeOrigin}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        connectionLineType={ConnectionLineType.Straight}
        fitView
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
