/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import classnames from "classnames";
import { HierarchyRectangularNode } from "d3-hierarchy";
import { interpolateSpectral } from "d3-scale-chromatic";
import { interpolateHcl } from "d3-interpolate";

import { ColorModel } from "./ITreeMapProps";
import Breadcrumb from "../components/Breadcrumb";
import TooltipProvider from "../components/Tooltip/TooltipProvider";
import { TooltipPlacement } from "react-d3-treemap/dist/components/Tooltip/types";
import { useTreeMap } from "./hooks";
import { useState } from "react";
import Node, { NumberOfChildrenPlacement } from "../components/Node";
import { NumberValue, scaleLinear, scaleSequential } from "d3-scale";
import {
  getColorDomainFn,
  getHighContrastColorFromString,
  getTopParent,
  getTopSubParentId,
} from "./helpers";

interface TreeMapInputData {
  name: string;
  value?: number;
  children?: Array<TreeMapInputData>;
  className?: string;
}

export interface CustomHierarchyRectangularNode<TreeMapInputData>
  extends HierarchyRectangularNode<TreeMapInputData> {
  customId: number;
}

const Treemap = ({
  id = "treemap",
  width = 1200,
  height = 800,
  data,
  colorModel = ColorModel.OneEachChildren,
  paddingInner = 4,
  paddingOuter = 4,
  levelsToDisplay = 1,
  disableTooltip = false,
  tooltipPlacement = "top",
  tooltipClassName = "",
  tooltipOffsetX = 0,
  tooltipOffsetY = 0,
  nodeStyle = {},
  svgStyle = {},
  className = "",
  svgClassName = "",
  breadCrumbClassName = "",
  disableBreadcrumb = false,
  namePropInData = "name",
  valuePropInData = "value",
  childrenPropInData = "children",
  linkPropInData = "link",
  darkNodeTextColor = "white",
  darkNodeBorderColor = "white",
  lightNodeTextColor = "black",
  lightNodeBorderColor = "black",
  hideNumberOfChildren = false,
  nodeClassName = "",
  hideValue = false,
  numberOfChildrenPlacement = NumberOfChildrenPlacement.TopRight,
  valueUnit = "",
  onZoom = () => null,
  customD3ColorScale = scaleSequential(interpolateSpectral),
}: {
  id: string;
  width: number;
  height: number;
  data: any;
  colorModel: ColorModel;
  paddingInner: number;
  paddingOuter: number;
  levelsToDisplay: number;
  nodeStyle: React.CSSProperties;
  svgStyle: React.CSSProperties;
  className: string;
  svgClassName: string;
  breadCrumbClassName: string;
  disableBreadcrumb: boolean;
  disableTooltip: boolean;
  tooltipPlacement: TooltipPlacement;
  tooltipClassName: string;
  tooltipOffsetX: number;
  tooltipOffsetY: number;
  namePropInData: string;
  valuePropInData: string;
  childrenPropInData: string;
  linkPropInData: string;
  darkNodeTextColor: string;
  darkNodeBorderColor: string;
  lightNodeTextColor: string;
  lightNodeBorderColor: string;
  hideNumberOfChildren: boolean;
  nodeClassName: string;
  hideValue: boolean;
  numberOfChildrenPlacement: NumberOfChildrenPlacement;
  valueUnit: string;
  onZoom?: (
    node: CustomHierarchyRectangularNode<TreeMapInputData>,
    nodeId: number,
    breadcrumbItems: any[],
  ) => void;
  customD3ColorScale?: any;
}) => {
  const topNode = useTreeMap({
    width,
    height,
    data,
    valuePropInData,
    paddingOuter,
  });
  const [breadcrumbItems, setBreadcrumbItems] = useState<any[]>([
    { text: data[namePropInData as keyof typeof data], key: 0 },
  ]);
  const [selectedNode, setSelectedNode] = useState<any>(topNode);
  // Put in a value, get pixels back
  const [xScaleFunction, setXScaleFunction] = useState<any>(
    scaleLinear().range([0, width]).domain([topNode.x0, topNode.x1]),
  );
  const [yScaleFunction, setYScaleFunction] = useState<any>(
    scaleLinear().range([0, height]).domain([topNode.y0, topNode.y1]),
  );
  console.log(
    "xScaleFunction",
    scaleLinear().range([0, width]).domain([topNode.x0, topNode.x1]),
  );
  // let xScaleFunction = scaleLinear()
  //   .range([0, width]) // pixels
  //   .domain([topNode.x0, topNode.x1]);

  // let yScaleFunction = scaleLinear()
  //   .range([0, height])
  //   .domain([topNode.y0, topNode.y1]);

  const onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>) => {
    zoomTo(Number(ev.currentTarget.id));
  };

  const onNodeClick = (
    ev: React.MouseEvent<SVGElement>,
    xScaleFunction: any,
    yScaleFunction: any,
    setYScaleFunction: any,
    setXScaleFunction: any,
  ) => {
    zoomTo(
      parseInt(ev.currentTarget.id),
      xScaleFunction,
      yScaleFunction,
      setYScaleFunction,
      setXScaleFunction,
    );
  };

  function getColorsFromNode(
    node: CustomHierarchyRectangularNode<TreeMapInputData>,
    nodeTotalNodes: number,
  ) {
    const colorDomainFn = getColorDomainFn(
      getTopParent(node),
      data,
      colorModel,
      childrenPropInData,
      valuePropInData,
      customD3ColorScale,
    );

    let backgroundColor;
    switch (colorModel) {
      case ColorModel.Depth:
        backgroundColor = colorDomainFn(node.depth);
        if (node.parent === null) {
          backgroundColor = colorDomainFn(0);
        }
        break;
      case ColorModel.Value:
        const selected = node[
          valuePropInData as keyof typeof node
        ] as NumberValue;
        backgroundColor = colorDomainFn(selected);
        if (node.parent === null) {
          backgroundColor = colorDomainFn(1);
        }
        break;
      case ColorModel.NumberOfChildren:
        backgroundColor = colorDomainFn(nodeTotalNodes);
        if (node.parent === null) {
          backgroundColor = colorDomainFn(1);
        }
        break;
      case ColorModel.OneEachChildren: {
        const originalBackgroundColor = colorDomainFn(
          getTopSubParentId<TreeMapInputData>(node),
        );
        if (node.depth > 1) {
          backgroundColor = scaleLinear<string>()
            .domain([0, node && node.children ? node.children.length : 0])
            .interpolate(interpolateHcl)
            .range(["white", originalBackgroundColor])(
            getTopSubParentId<TreeMapInputData>(node),
          );
        } else {
          backgroundColor = originalBackgroundColor;
        }
        if (node.parent === null) {
          backgroundColor = colorDomainFn(0);
        }
      }
    }

    return {
      bgColor: backgroundColor,
      textColor:
        getHighContrastColorFromString(backgroundColor) === "dark"
          ? darkNodeTextColor
          : lightNodeTextColor,
      borderColor:
        getHighContrastColorFromString(backgroundColor) === "dark"
          ? darkNodeBorderColor
          : lightNodeBorderColor,
    };
  }

  function zoomTo(
    nodeId: number,
    xScaleFunction?: any,
    yScaleFunction?: any,
    setYScaleFunction?: any,
    setXScaleFunction?: any,
  ) {
    const currentNode = getTopParent(selectedNode)
      .descendants()
      .filter((item: CustomHierarchyRectangularNode<unknown>): boolean => {
        return item.customId.toString() === nodeId.toString();
      })
      .pop();
    if (currentNode) {
      const breadcrumbItems = getTopParent(currentNode)
        .path(currentNode)
        .map(({ data, customId }: { data: any; customId: number }) => {
          return {
            text: data["name"],
            key: customId,
            onClick: customId !== nodeId ? onBreadcrumbItemClicked : undefined,
          };
        });
      if (onZoom) {
        onZoom(
          currentNode.depth as unknown as CustomHierarchyRectangularNode<TreeMapInputData>,
          nodeId,
          breadcrumbItems,
        );
      }
      console.log(xScaleFunction, yScaleFunction);
      setXScaleFunction(
        xScaleFunction.domain([currentNode.x0, currentNode.x1]),
      );
      // (xScaleFunction = xScaleFunction.domain([
      //   currentNode.x0,
      //   currentNode.x1,
      // ])),
      setYScaleFunction(
        yScaleFunction.domain([currentNode.y0, currentNode.y1]),
      );
      // (yScaleFunction = yScaleFunction.domain([
      //   currentNode.y0,
      //   currentNode.y1,
      // ])),
      setSelectedNode(currentNode);
      setBreadcrumbItems(breadcrumbItems);
    } else {
      console.warn("No node found for " + nodeId);
    }
  }

  function resetZoom(): void {
    zoomTo(0);
  }

  function zoomOut(): void {
    if (
      selectedNode &&
      selectedNode.parent &&
      selectedNode.parent.customId !== undefined
    ) {
      zoomTo(selectedNode.parent.customId);
    }
  }

  function getZoomLevel(): number {
    return selectedNode.depth;
  }

  function getNode(node: CustomHierarchyRectangularNode<TreeMapInputData>) {
    const { customId, data, x0, x1, y0, y1 } = node;

    const name = data[namePropInData as keyof typeof data];
    const url = data[linkPropInData as keyof typeof data];
    const nodeClassNameFromData = data["className"];

    const children = node[childrenPropInData as keyof typeof node] as any[];

    const hasChildren = children && children?.length > 0 ? true : false;
    const formatted = node[valuePropInData as keyof typeof node];

    const formattedValue = `(${formatted}${valueUnit ? ` ${valueUnit}` : ""})`;

    const nodeTotalNodes = node.descendants().length - 1;

    const { bgColor, textColor, borderColor } = getColorsFromNode(
      node,
      nodeTotalNodes,
    );

    const isSelectedNode = customId === selectedNode.customId;

    return (
      <Node
        height={height}
        width={width}
        bgColor={bgColor}
        textColor={textColor}
        borderColor={borderColor}
        className={classnames(nodeClassName, nodeClassNameFromData)}
        style={{
          fontVariant: "normal",
          fontWeight: "normal",
          fontSize: 14,
          fontFamily: "Arial",
          ...nodeStyle,
        }}
        hasChildren={hasChildren}
        hideNumberOfChildren={hideNumberOfChildren}
        id={customId}
        isSelectedNode={isSelectedNode}
        key={customId}
        label={name as string}
        nodeTotalNodes={nodeTotalNodes}
        onClick={
          !isSelectedNode
            ? (ev) =>
                onNodeClick(
                  ev,
                  xScaleFunction,
                  yScaleFunction,
                  setXScaleFunction,
                  setYScaleFunction,
                )
            : () => null
        }
        treemapId={id}
        url={url as string}
        value={(!hideValue && formattedValue) as string}
        x0={x0}
        x1={x1}
        xScaleFunction={
          xScaleFunction ||
          scaleLinear().range([0, height]).domain([topNode.x0, topNode.x1])
        }
        y0={y0}
        y1={y1}
        yScaleFunction={
          yScaleFunction ||
          scaleLinear().range([0, height]).domain([topNode.y0, topNode.y1])
        }
        numberOfChildrenPlacement={numberOfChildrenPlacement}
        paddingInner={paddingInner}
      />
    );
  }

  let reactNodes: Array<React.ReactNode> = [];
  const maxLevel = selectedNode.depth === 0 ? levelsToDisplay : 1;

  const iterateAllChildren = (
    mainNode: CustomHierarchyRectangularNode<TreeMapInputData>,
    level: number,
  ) => {
    reactNodes = reactNodes.concat(getNode(mainNode));

    const children = mainNode[
      childrenPropInData as keyof typeof mainNode
    ] as any[];

    if (level < maxLevel) {
      if (children && children?.length > 0) {
        children?.forEach(
          (element: CustomHierarchyRectangularNode<TreeMapInputData>) => {
            iterateAllChildren(element, level + 1);
          },
        );
      }
    }
  };
  iterateAllChildren(selectedNode, 0);

  return (
    <TooltipProvider
      tooltipPlacement={tooltipPlacement}
      tooltipClassName={tooltipClassName}
      disableTooltip={disableTooltip}
      tooltipOffsetX={tooltipOffsetX}
      tooltipOffsetY={tooltipOffsetY}
    >
      <div className={className}>
        {disableBreadcrumb === false ? (
          <Breadcrumb items={breadcrumbItems} className={breadCrumbClassName} />
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
