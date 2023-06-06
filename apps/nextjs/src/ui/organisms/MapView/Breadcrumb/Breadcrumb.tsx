import * as React from "react";
import classnames from "classnames";
import { zoomTo } from "../Treemap/helpers";
import { CustomHierarchyRectangularNode } from "../Treemap/Treemap";

export interface IBreadcrumbProps {
  /**
   * Collection of breadcrumbs to render
   */
  items: IBreadcrumbItem[];
  className?: string;
  selectedNode: any;
  setRootNode: React.Dispatch<
    React.SetStateAction<CustomHierarchyRectangularNode<any>>
  >;

  setSelectedNode: any;
  setBreadcrumbItems: React.Dispatch<
    React.SetStateAction<{ text: string; key: number }[]>
  >;
}

export interface IBreadcrumbItem {
  /**
   * Text to display to the user for the breadcrumb
   */
  text: string;
  /**
   * Arbitrary unique string associated with the breadcrumb
   */
  key: number;
  /**
   * Callback issued when the breadcrumb is selected.
   */
  onClick?: (
    ev?: React.MouseEvent<HTMLElement>,
    item?: IBreadcrumbItem,
  ) => void;
}

export const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = ({
  className,
  items,
  selectedNode,
  setRootNode,
  setSelectedNode,
  setBreadcrumbItems,
}) => {
  if (!items) {
    return null;
  }

  const onBreadcrumbClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    zoomTo(
      parseInt(ev.currentTarget.id),
      selectedNode,
      setRootNode,
      setSelectedNode,
      setBreadcrumbItems,
    );
  };

  return (
    <div className={classnames("TreeMap__breadcrumb", className)}>
      {items.length > 1 ? (
        items.map((item: IBreadcrumbItem, index: number) => (
          <div key={index}>
            <a
              className=" ml-2 text-white"
              key={item.key}
              id={`${item.key}`}
              onClick={onBreadcrumbClick}
              style={{
                cursor: index !== items.length - 1 ? "pointer" : "auto",
              }}
            >
              {item.text}
            </a>
            {index < items.length - 1 ? (
              <span className="ml-1 text-white">/</span>
            ) : null}
          </div>
        ))
      ) : (
        <div className="h-6" />
      )}
    </div>
  );
};
