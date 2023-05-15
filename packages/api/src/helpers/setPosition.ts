import { Nodes } from "@prisma/client";

const setPosition = (subject: Nodes, index: number) => {
  const numberOfChildren = subject.children.length || 1;

  const degreesOfSeparation = 360 / numberOfChildren;

  const x = Math.cos(degreesOfSeparation * (index + 1)) * 300;
  const y = Math.sin(degreesOfSeparation * (index + 1)) * 300;

  if (subject.id === "clggtsotk0004p0eqk2lfm793") {
    return { x: 0, y: 0 };
  }

  if (subject.id === "ovr8ku7wllxdqty01ovhmjre") {
    return { x: 300, y: 150 };
  }

  if (subject.id === "tsnn44wkim179hq4fgtag0ta") {
    return { x: -300, y: -150 };
  }

  if (subject.id === "zrqnyjntpa3cbyc0b66cjglq") {
    return { x: 0, y: -300 };
  }

  return { x, y };
};

export default setPosition;
