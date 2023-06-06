import * as React from "react";
import classnames from "classnames";
import { ScaleLinear } from "d3-scale";
import useTooltip from "../Tooltip/useTooltip";
import { Tooltip } from "../Tooltip/Tooltip";
import NumberOfChildren, {
  NumberOfChildrenPlacement,
} from "./NumberOfChildren";
import { getNumberItemsWidthByNumberOfChars } from "./helpers";
import LabelNewLine from "./LabelNewLine";
import { useRouter } from "next/router";

export interface NodeProps {
  /*
        HierarchyRectangularNode properties
    */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  data: any;
  bgColor: string;
  borderColor: string;
  className?: string;
  hasChildren: boolean;
  hideNumberOfChildren?: boolean;
  id: number;
  isSelectedNode: boolean;
  label: string;
  nodeTotalNodes: number;
  numberOfChildrenPlacement: NumberOfChildrenPlacement;
  onClick?: (ev: React.MouseEvent<SVGElement>) => void;
  style?: React.CSSProperties;
  textColor: string;
  treemapId?: string;
  url: string;
  value: string;
  xScaleFunction: ScaleLinear<number, number>;
  yScaleFunction: ScaleLinear<number, number>;
  paddingInner: number;
  splitRegExp?: RegExp;
  height?: number;
  width?: number;
}

const Node: React.FunctionComponent<NodeProps> = ({
  data,
  bgColor,
  borderColor,
  className,
  hasChildren,
  hideNumberOfChildren,
  id,
  isSelectedNode,
  label,
  nodeTotalNodes,
  onClick,
  textColor,
  treemapId,
  url,
  value,
  x0,
  x1,
  xScaleFunction,
  y0,
  y1,
  yScaleFunction,
  style,
  numberOfChildrenPlacement,
  paddingInner,
  splitRegExp,
}) => {
  const router = useRouter();
  const currentXTranslated = Math.max(0, xScaleFunction(x0) + paddingInner);
  const currentYTranslated = Math.max(0, yScaleFunction(y0) + paddingInner);
  const currentWidth = Math.max(
    0,
    xScaleFunction(x1) - xScaleFunction(x0) - paddingInner,
  );

  const currentHeight = Math.max(
    0,
    yScaleFunction(y1) - yScaleFunction(y0) - paddingInner,
  );

  const cursor = isSelectedNode === false ? "pointer" : "auto";

  const fontSize = Number(style?.fontSize);
  const itemsWidth = getNumberItemsWidthByNumberOfChars(
    fontSize,
    nodeTotalNodes.toString().length,
  );
  const showNumberOfItems = !hideNumberOfChildren && hasChildren;

  const paddedCurrentWidth =
    currentWidth -
    (Number(style?.paddingLeft) || 0) -
    (Number(style?.paddingRight) || 4);
  const clipWidth = Math.max(
    0,
    showNumberOfItems &&
      numberOfChildrenPlacement === NumberOfChildrenPlacement.TopRight
      ? paddedCurrentWidth - itemsWidth
      : paddedCurrentWidth,
  );

  const { hideTooltip, showTooltip, disableTooltip } = useTooltip();

  const handleMouseMove = React.useCallback(
    (ev: React.MouseEvent) => {
      showTooltip(<Tooltip label={label} value={value} />, ev);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showTooltip],
  );

  const handleMouseLeave = React.useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  const handleClick = () => {
    router.push(`/subject/${data.id}`);
  };

  return (
    <g
      onMouseEnter={disableTooltip ? undefined : handleMouseMove}
      onMouseLeave={disableTooltip ? undefined : handleMouseLeave}
      onMouseMove={disableTooltip ? undefined : handleMouseMove}
      transform={`translate(${currentXTranslated},${currentYTranslated})`}
      id={`${id}`}
      onClick={hasChildren ? onClick : handleClick}
      style={{ cursor }}
    >
      <rect
        id={`rect-${id}`}
        width={currentWidth}
        height={currentHeight}
        className={classnames("Node", className)}
        style={{
          fill: bgColor,
          stroke: borderColor,
          ...style,
        }}
      />
      <clipPath id={`clip-${treemapId}-${id}`}>
        <rect width={clipWidth} height={currentHeight} />
      </clipPath>
      <a
        className={classnames({ Node__link: !!url })}
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <text
          clipPath={`url(#clip-${treemapId}-${id})`}
          transform={`translate(${style?.paddingLeft || 0},${
            style?.paddingTop || 0
          })`}
          style={{
            fontVariant: style?.fontVariant,
            fontWeight: style?.fontWeight,
            fontSize: style?.fontSize,
            fontFamily: style?.fontFamily,
          }}
        >
          <LabelNewLine
            label={label}
            textColor={textColor}
            value={value}
            hasChildren={hasChildren}
            containerWidth={clipWidth}
            containerHeight={currentHeight}
            style={style as React.CSSProperties}
            splitRegExp={splitRegExp}
          />
        </text>
      </a>
      {showNumberOfItems && (
        <NumberOfChildren
          customId={id}
          width={currentWidth}
          height={currentHeight}
          style={style as React.CSSProperties}
          textColor={textColor}
          nodeTotalNodes={nodeTotalNodes}
          isSelectedNode={isSelectedNode}
          placement={numberOfChildrenPlacement}
        />
      )}
    </g>
  );
};

export default Node;
