import { Nodes } from "@prisma/client";

const setPosition = (subject: Nodes, index: number) => {
  if (subject.id === "clggtsotk0004p0eqk2lfm793") {
    return { x: 0, y: 0 };
  }

  if (subject.id === "ovr8ku7wllxdqty01ovhmjre") {
    return { x: 900, y: 500 };
  }

  if (subject.id === "tsnn44wkim179hq4fgtag0ta") {
    return { x: -900, y: -500 };
  }

  if (subject.id === "zrqnyjntpa3cbyc0b66cjglq") {
    return { x: 0, y: -900 };
  }
  const numberOfChildren = subject.children.length || 1;

  const degreesOfSeparation = 360 / numberOfChildren;

  const x = Math.cos(degreesOfSeparation * (index + 1)) * 200;
  const y = Math.sin(degreesOfSeparation * (index + 1)) * 200;
  return { x, y };
};

export default setPosition;
