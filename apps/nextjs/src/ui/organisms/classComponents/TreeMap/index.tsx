export { ColorModel } from "./ITreeMapProps";
export type { ITreeMapProps } from "./ITreeMapProps";

import * as React from "react";
import TreeMap from "./TreeMap";
import { data } from "../../data";
// Be sure to include styles at some point
import "react-d3-treemap/dist/react.d3.treemap.css";
import { ColorModel } from "./ITreeMapProps";

const Treemap = ({ width, height }: { width: number; height: number }) => {
  return (
    <div className="app-container">
      <TreeMap
        id="myTreeMap"
        height={height}
        width={width}
        data={data}
        colorModel={ColorModel.OneEachChildren}
        paddingInner={3}
        levelsToDisplay={1}
        nodeStyle={{ paddingLeft: 5, paddingRight: 5 }}
      />
    </div>
  );
};
export default Treemap;
