import { Node, Edge, XYPosition } from "reactflow";
import { Prisma, Subjects } from "@prisma/client";
import setPosition from "./setPosition";

interface NewNode extends Node {
  children?: Subjects[] | null;
}

const createNodesAndEdges = (subjects: Subjects[]) => {
  const nodeArray: NewNode[] = [];
  const edgeArray: Edge[] = [];

  const pushToArrays = (
    parent: Subjects,
    child: Subjects,
    index: number,
  ): void => {
    const { x, y } = setPosition(parent, index);

    nodeArray.push({
      id: child?.id,
      type: child.type,
      data: {
        label: child.name,
        description: child.description,
      },
      position: {
        x,
        y,
      },
      parentNode: parent.id,
      children: child.children as Subjects[],
    });

    edgeArray.push({
      id: `${parent.id}-${child.id}`,
      source: parent.id,
      target: child.id,
    });
  };

  const loopThroughChildren = (
    child: Subjects,
    children: Subjects[],
    pushToArrays: (subject: Subjects, child: Subjects, index: number) => void,
  ) => {
    for (const k in children) {
      if (children[k]) {
        pushToArrays(child as Subjects, children[k] as Subjects, Number(k));
      }

      if (children[k]?.children) {
        loopThroughChildren(
          children[k] as Subjects,
          children[k]?.children as Subjects[],
          pushToArrays,
        );
      }
    }
  };

  subjects?.forEach((subject, index) => {
    let position: XYPosition;

    if (subject.name === "Arts & Humanities") {
      position = { x: index + 2 + 500 * -1, y: index + 2 + 200 };
    } else {
      position = { x: index + 2 + 800, y: index + 2 - 50 };
    }

    nodeArray.push({
      id: subject.id,
      type: subject.type,
      data: {
        label: subject.name,
        description: subject.description,
      },
      position: position,
      parentNode: "clggtsotk0004p0eqk2lfm793",
    });

    edgeArray.push({
      id: `clggtsotk0004p0eqk2lfm793-${subject.id}`,
      source: "clggtsotk0004p0eqk2lfm793",
      target: subject.id,
    });

    const childrenObject = subject.children as Prisma.JsonObject;
    const children = childrenObject.children as Prisma.JsonArray;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?.forEach((child: any, index: number) => {
      pushToArrays(subject, child, index);

      if (child.children) {
        loopThroughChildren(child, child.children as Subjects[], pushToArrays);
      }
    });
  });

  return { nodeArray, edgeArray };
};

export default createNodesAndEdges;
