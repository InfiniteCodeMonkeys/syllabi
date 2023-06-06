import {
  ScaleLinear,
  scaleLinear,
  scaleSequentialLog,
  scaleSequentialQuantile,
} from "d3-scale";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { CustomHierarchyRectangularNode } from "./Treemap";
import NodeComponent, { NumberOfChildrenPlacement } from "../Node";
import classnames from "classnames";
import { getTopParent } from "ui/organisms/Treemap/helpers";
import {
  interpolateRainbow,
  interpolateRdYlBu,
  interpolateBuGn,
  interpolatePuBuGn,
} from "d3-scale-chromatic";

export const zoomTo = (
  nodeId: any,
  selectedNode: any,
  setRootNode: Dispatch<SetStateAction<CustomHierarchyRectangularNode<any>>>,

  setSelectedNode: any,
  setBreadcrumbItems: Dispatch<SetStateAction<{ text: string; key: number }[]>>,
) => {
  const currentNode = getTopParent(selectedNode)
    .descendants()
    .filter((item: CustomHierarchyRectangularNode<any>) => {
      return item.customId.toString() === nodeId.toString();
    })
    .pop();

  if (currentNode) {
    const breadcrumbItems = getTopParent(currentNode)
      .path(currentNode)
      .map(({ data, customId }: CustomHierarchyRectangularNode<any>) => {
        return {
          text: data["name"],
          key: customId,
        };
      });

    setRootNode(currentNode);
    setSelectedNode(currentNode);
    setBreadcrumbItems(breadcrumbItems);
  } else {
    console.warn("No node found for " + nodeId);
  }
};

const getColorsFromNode = (node: any, nodeTotalNodes: number, colors: any) => {
  const scale = scaleSequentialLog(interpolatePuBuGn).domain([
    0,
    node.parent?.value / 2,
    node.parent?.value / 3,
    node.parent?.value / 4,
  ]);

  switch (node.depth) {
    case 0:
      return {
        bgColor: "transparent",
        textColor: "white",
        borderColor: "white",
      };

    case 1:
      return {
        bgColor: scale(node.customId),
        textColor: "white",
        borderColor: "white",
      };
    default:
      return {
        bgColor: scale(node.customId),
        textColor: "white",
        borderColor: "white",
      };
  }
};

// getNode
const getNode = (
  node: CustomHierarchyRectangularNode<any>,
  selectedNode: any,
  setSelectedNode: any,
  xScaleFunction: ScaleLinear<number, number, never>,
  yScaleFunction: ScaleLinear<number, number, never>,
  setRootNode: Dispatch<SetStateAction<CustomHierarchyRectangularNode<any>>>,
  setBreadcrumbItems: Dispatch<SetStateAction<{ text: string; key: number }[]>>,
): ReactNode => {
  const { customId, data, x0, x1, y0, y1 } = node;

  const name = data["name"];
  const nodeClassNameFromData = data["className"];

  const hasChildren =
    node["children"] && node["children"].length > 0 ? true : false;

  const nodeTotalNodes = node.descendants().length - 1;

  const isSelectedNode = customId === selectedNode.customId;

  const { bgColor, textColor, borderColor } = getColorsFromNode(
    node,
    nodeTotalNodes,
    {
      darkNodeTextColor: "white",
      darkNodeBorderColor: "white",
      lightNodeTextColor: "black",
      lightNodeBorderColor: "black",
    },
  );

  const onNodeClick = (ev: React.MouseEvent<SVGElement>) => {
    zoomTo(
      parseInt(ev.currentTarget.id),
      selectedNode,
      setRootNode,
      setSelectedNode,
      setBreadcrumbItems,
    );
  };

  return (
    <NodeComponent
      data={data}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
      className={classnames(nodeClassNameFromData)}
      style={{
        fontVariant: "normal",
        fontWeight: "normal",
        fontSize: 14,
        fontFamily: "Arial",
      }}
      hasChildren={hasChildren}
      hideNumberOfChildren={false}
      id={customId}
      isSelectedNode={isSelectedNode}
      key={customId}
      label={name}
      nodeTotalNodes={nodeTotalNodes || data.value}
      onClick={!isSelectedNode ? onNodeClick : undefined}
      value=""
      x0={x0}
      x1={x1}
      xScaleFunction={xScaleFunction}
      y0={y0}
      y1={y1}
      yScaleFunction={yScaleFunction}
      numberOfChildrenPlacement={NumberOfChildrenPlacement.BottomRight}
      url=""
      paddingInner={4}
    />
  );
};

// getReactNodes
export const getReactNodes = ({
  selectedNode,
  setSelectedNode,
  xScaleFunction,
  yScaleFunction,
  setRootNode,
  setBreadcrumbItems,
  levelsToDisplay,
}: {
  selectedNode: any;
  setSelectedNode: any;
  xScaleFunction: ScaleLinear<number, number, never>;
  yScaleFunction: ScaleLinear<number, number, never>;
  setRootNode: Dispatch<SetStateAction<CustomHierarchyRectangularNode<any>>>;
  setBreadcrumbItems: Dispatch<SetStateAction<{ text: string; key: number }[]>>;
  levelsToDisplay: number;
}) => {
  const reactNodes: Array<ReactNode> = [];

  const maxLevel = selectedNode.depth === 0 ? levelsToDisplay : 1;
  const iterateAllChildren = (
    mainNode: CustomHierarchyRectangularNode<any>,
    level: number,
  ) => {
    reactNodes.push(
      getNode(
        mainNode,
        selectedNode,
        setSelectedNode,
        xScaleFunction,
        yScaleFunction,
        setRootNode,
        setBreadcrumbItems,
      ),
    );

    const children = mainNode["children" as keyof typeof mainNode] as any[];

    if (level < maxLevel) {
      if ("children" in mainNode && children.length > 0) {
        children.forEach((element: CustomHierarchyRectangularNode<any>) => {
          iterateAllChildren(element, level + 1);
        });
      }
    }
  };
  iterateAllChildren(selectedNode, 0);

  return reactNodes;
};
