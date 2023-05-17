const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");
const subjects = "../data/subjectsAndDisciplines.json";
const moveFrom = "../data/subjects";

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
  data.forEach((subject) => {
    if (!subject.id) {
      subject.id = createId();
    }
    if (!subject.data) {
      subject.data = {};
      subject.data.name = subject.name;
      subject.data.description = subject.description;

      delete subject.name;
      delete subject.description;
    }
    if (Object.keys(subject.children).length === 0) {
      subject.children = [];
    }

    if (typeof subject.parent === "string") {
      const parent = data.filter(
        (item) => item.data?.name === subject.parent,
      )[0];
      if (parent) {
        subject.parent = { id: parent.id, data: parent.data };
        parent.children.push(subject.id);
      }
    }
  });

  // write to file
  fs.writeFileSync(subjects, JSON.stringify([...data]));
  console.log("Success!");
};

cleanUpJSON(data);

const reformatJSON = (data) => {
  fs.writeFileSync(subjects, JSON.stringify(data.flat()));
  console.log("Done!");
};

// reformatJSON(data);

const setEmptyChildrenToArray = (data) => {
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

// setEmptyChildrenToArray(data);

const addIdToSubjects = async () => {
  const files = await fs.promises.readdir(moveFrom);

  // Loop them all with the new for...of
  for await (const file of files) {
    console.log(file);
    const data = JSON.parse(
      fs.readFileSync(`../data/subjects/${file}`, "utf8"),
    );

    console.log(data.subdisciplines);
    fs.writeFileSync(
      subjects,
      JSON.stringify([...nodes, ...data.subdisciplines]),
    );
    // cleanUpJSON(data.subdisciplines);
  }
};

//addIdToSubjects();
