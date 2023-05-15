const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");
const subjects = "../data/nodes.json";

const data = JSON.parse(fs.readFileSync(subjects, "utf8"));

const SCHOOLS = ["Arts", "Humanities", "Sciences"];

const SUBJECTS = [
  "Anthropology",
  "Archaeology",
  "Art History",
  "Astronomy",
  "Biology",
  "Chemistry",
  "Classics",
  "Communication Studies",
  "Computer Science",
  "Creative Writing",
  "Cultural Studies",
  "Earth Science",
  "Economics",
  "Engineering",
  "English Literature",
  "Ethics",
  "Film Studies",
  "Fine Arts",
  "Gender & Sexuality Studies",
  "History",
  "Journalism",
  "Linguistics",
  "Mathematics",
  "Media Studies",
  "Musicology",
  "Neuroscience",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Religious Studies",
  "Sociology",
  "Theater and Performance Studies",
];

const cleanUpJSON = (data) => {
  const newChildArray = [];
  data.forEach((subject) => {
    // reformat where name and decription are nested in data
    subject.data = {};
    subject.data.name = subject.name;
    subject.data.description = subject.description;

    delete subject.name;
    delete subject.description;

    if (subject.children && subject.children.length > 0) {
      const IDarray = [];

      subject.children.forEach((child) => {
        // children should be an array of child Ids
        IDarray.push(child.id);

        // change parent from name to an id for consistency
        const parent = data.filter((item) => item.data?.name === child.parent);
        console.log("data", data);
        console.log("child", child);
        console.log("parent of child", parent);
        child.parent = parent.id;

        // we don't want to duplicate children in the parent's children array
        console.log("parent.children", parent.children);
        if (!parent.children?.includes(child.id)) {
          parent.children?.push(child.id);
        }

        // reformat where name and decription are nested in data
        child.data = {};
        child.data.name = child.name;
        child.data.description = child.description;

        delete child.name;
        delete child.description;
      });
      // we want all nodes at one level when we create edges and upload to prisma
      newChildArray.push(subject.children);

      // set children to an array of child Ids
      subject.children = IDarray;
    }
    // do the same for subjects. set their parents to an id
    const parent = data.filter((item) => item.name === subject.parent);
    // console.log("subject", subject);
    // console.log("parent", parent);
    subject.parent = parent.id;
  });

  // write to nodes.json
  fs.writeFileSync(subjects, JSON.stringify({ ...data, ...newChildArray }));
  console.log("Success!");
};

// cleanUpJSON(data);

const reformatJSON = (data) => {
  fs.writeFileSync(subjects, JSON.stringify(data.flat()));
  console.log("Done!");
};

// reformatJSON(data);

const setEmptyChildrenToNull = (data) => {
  data.forEach((subject) => {
    if (!subject.children) {
      subject.children = [];
    } else if (Object.keys(subject.children).length === 0) {
      subject.children = [];
    }
  });
  fs.writeFileSync(subjects, JSON.stringify(data));
  console.log("Done!");
};

setEmptyChildrenToNull(data);
