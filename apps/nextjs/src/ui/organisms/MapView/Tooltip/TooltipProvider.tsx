import React, {
  MouseEvent,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import TooltipContainer from "./TooltipContainer";
import TooltipContext from "./TooltipContext";
import { TooltipPlacement, TooltipPosition } from "./types";

const TooltipProvider: React.FunctionComponent<{
  tooltipPlacement?: TooltipPlacement;
  tooltipClassName?: string;
  disableTooltip: boolean;
  tooltipOffsetX?: number;
  tooltipOffsetY?: number;
  children?: React.ReactNode;
}> = ({
  tooltipPlacement = "topRight",
  tooltipClassName,
  tooltipOffsetX,
  tooltipOffsetY,
  disableTooltip,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [pos, setPos] = useState<TooltipPosition>([0, 0]);
  const [content, setContent] = useState<ReactNode>(null);
  const [placement, setPlacement] =
    useState<TooltipPlacement>(tooltipPlacement);

  const showTooltip = useCallback(
    (content: ReactNode, event: MouseEvent) => {
      const rect = containerRef?.current?.getBoundingClientRect();
      const width = rect?.width || 0;
      const height = rect?.height || 0;
      const left = rect?.left || 0;
      const top = rect?.top || 0;
      // const { width, height, left, top } =
      //   containerRef?.current?.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;

      if (!placement) {
        const autoPlacement: TooltipPlacement =
          x < width / 2
            ? y < height / 2
              ? "bottomRight"
              : "topRight"
            : y < height / 2
            ? "bottomLeft"
            : "topLeft";
        setPlacement(autoPlacement);
      }

      setIsVisible(true);
      setPos([x, y]);
      setContent(content);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerRef, setContent, setIsVisible, setPos],
  );

  const hideTooltip = useCallback(() => {
    setIsVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsVisible, setPos]);

  const tooltipContextValue = React.useMemo(
    () => ({
      showTooltip,
      hideTooltip,
      tooltipClassName,
      disableTooltip,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showTooltip, hideTooltip, tooltipClassName],
  );

  return (
    <TooltipContext.Provider value={tooltipContextValue}>
      <div ref={containerRef}>
        {children}
        {isVisible && (
          <TooltipContainer
            position={pos}
            placement={placement}
            offsetX={tooltipOffsetX}
            offsetY={tooltipOffsetY}
          >
            {content}
          </TooltipContainer>
        )}
      </div>
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
