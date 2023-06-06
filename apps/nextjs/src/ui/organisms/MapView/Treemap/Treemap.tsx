import React, { useCallback, useState } from "react";
import { HierarchyRectangularNode } from "d3-hierarchy";
import { useTreeMap } from "./hooks";
import { scaleLinear } from "d3-scale";
import classnames from "classnames";
import Breadcrumb from "../Breadcrumb";
import TooltipProvider from "../Tooltip/TooltipProvider";
import { getReactNodes } from "./helpers";

export interface CustomHierarchyRectangularNode<TreeMapInputData>
  extends HierarchyRectangularNode<TreeMapInputData> {
  customId: number;
}

const Treemap = ({
  width,
  height,
  data,
  svgClassName,
  svgStyle,
  disableBreadcrumb = false,
  tooltipPlacement,
  disableTooltip = false,
  tooltipOffsetX,
  tooltipOffsetY,
  levelsToDisplay = 1,
}: {
  width: number;
  height: number;
  data: any;
  svgClassName?: string;
  svgStyle?: React.CSSProperties;
  disableBreadcrumb?: boolean;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  disableTooltip?: boolean;
  tooltipOffsetX?: number;
  tooltipOffsetY?: number;
  levelsToDisplay?: number;
}) => {
  const topNode = useTreeMap({
    width,
    height,
    data,
    valuePropInData: "value",
    paddingOuter: 4,
  });
  const [rootNode, setRootNode] =
    useState<CustomHierarchyRectangularNode<any>>(topNode);
  const [selectedNode, setSelectedNode] = useState(topNode);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const xScaleFunction = useCallback(
    scaleLinear().range([0, width]).domain([rootNode.x0, rootNode.x1]),
    [rootNode],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const yScaleFunction = useCallback(
    scaleLinear().range([0, height]).domain([rootNode.y0, rootNode.y1]),
    [rootNode],
  );

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: data["name"], key: 0 },
  ]);

  const reactNodes = getReactNodes({
    selectedNode,
    setSelectedNode,
    xScaleFunction,
    yScaleFunction,
    setRootNode,
    setBreadcrumbItems,
    levelsToDisplay,
  });

  return (
    <TooltipProvider
      tooltipPlacement={tooltipPlacement}
      disableTooltip={disableTooltip}
      tooltipOffsetX={tooltipOffsetX}
      tooltipOffsetY={tooltipOffsetY}
    >
      <div>
        {disableBreadcrumb === false ? (
          <Breadcrumb
            items={breadcrumbItems}
            setRootNode={setRootNode}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            setBreadcrumbItems={setBreadcrumbItems}
          />
        ) : null}
        <svg
          className={classnames(svgClassName)}
          height={height}
          width={width}
          style={{ ...svgStyle }}
        >
          {reactNodes}
        </svg>
      </div>
    </TooltipProvider>
  );
};

export default Treemap;
