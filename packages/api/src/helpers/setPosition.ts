interface Parent {
  id?: string;
  name?: string;
  description?: string | null;
  type?: string;
  children: any;
  position?: any;
}

const setPosition = (parent: Parent, index: number) => {
  const numberOfChildren = parent.children?.children?.length || 1;

  const degreesOfSeparation = 360 / numberOfChildren;

  const newX = Math.cos(degreesOfSeparation * (index + 1)) * 300;
  const newY = Math.sin(degreesOfSeparation * (index + 1)) * 300;

  const x = newX;
  const y = newY;

  return { x, y };
};

export default setPosition;
