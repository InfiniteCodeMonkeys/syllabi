import { Nodes } from "@prisma/client";

const setPosition = (subject: Nodes, index: number) => {
  const numberOfChildren = subject.children.length || 1;

  const degreesOfSeparation = 360 / numberOfChildren;

  const x = Math.cos(degreesOfSeparation * (index + 1)) * 300;
  const y = Math.sin(degreesOfSeparation * (index + 1)) * 300;

  return { x, y };
};

export default setPosition;
