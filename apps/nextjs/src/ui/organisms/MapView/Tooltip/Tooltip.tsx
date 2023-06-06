import * as React from "react";

import useTooltip from "./useTooltip";

interface TooltipProps {
  label: React.ReactNode;
  value?: number | string | Date;
}

// eslint-disable-next-line react/display-name
export const Tooltip = React.memo<TooltipProps>(({ label, value }) => {
  const { tooltipClassName } = useTooltip();
  return (
    <div className={tooltipClassName}>
      <div className="TreeMap__tooltip">
        {value !== undefined ? (
          <>
            <span className="TreeMap__tooltipLabel">{label}: </span>
            <span className="TreeMap__tooltipValue">{`${value}`}</span>
          </>
        ) : (
          label
        )}
      </div>
    </div>
  );
});
