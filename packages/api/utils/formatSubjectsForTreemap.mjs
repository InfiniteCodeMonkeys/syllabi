import fs from "fs";

const subjectsFile = "../data/combined.json";
const formattedSubjectsFile = "../data/formattedSubjects.json";

const subjectos = JSON.parse(fs.readFileSync(subjectsFile, "utf8"));

const formatSubjectsForTreemap = (subjects) => {
  const formattedSubjects = [];

  const rootNode = subjects.filter((subject) => {
    return subject.id === "clggtsotk0004p0eqk2lfm793";
  });

  // recursive function to loop through children
  const loopThroughChildren = (children) => {
    const formattedArray = [];
    for (const child in children) {
      const foundChild = subjects.filter((subject) => {
        return subject.id === children[child];
      });

      console.log(foundChild[0].children);

      formattedArray.push({
        name: foundChild[0].data.name,
        value:
          foundChild[0]?.children?.length > 1
            ? foundChild[0]?.children?.length
            : 1,
        children: loopThroughChildren(foundChild[0]?.children) || [],
      });
    }
    return formattedArray;
  };

  const chlidren = loopThroughChildren(rootNode[0].children);

  formattedSubjects.push({
    name: rootNode[0].data.name,
    children: chlidren,
  });

  fs.writeFileSync(formattedSubjectsFile, JSON.stringify(formattedSubjects[0]));

  console.log("Subjects formatted");
};
formatSubjectsForTreemap(subjectos);
