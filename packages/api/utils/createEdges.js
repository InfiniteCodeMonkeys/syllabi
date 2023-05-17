const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");

const createEdges = () => {
  const nodesFile = "../data/subjectsAndDisciplines.json";
  const edgesFile = "../data/edges.json";

  const nodes = JSON.parse(fs.readFileSync(nodesFile, "utf8"));

  const edges = [];
  nodes.forEach((subject) => {
    if (subject.children && subject.children.length > 0) {
      subject.children.forEach((child) => {
        edges.push({
          id: createId(),
          source: subject.id,
          target: child,
        });
      });
    }
  });
  fs.writeFileSync(edgesFile, JSON.stringify(edges));
  console.log("Success!");
};

createEdges();
