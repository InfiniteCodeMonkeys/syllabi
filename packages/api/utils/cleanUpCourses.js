const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");
const { get } = require("http");
const coursesDir = "../data/courses";
const coursesFile = "../data/courses.json";
const subjectsFile = "../data/subjectsAndDisciplines.json";
const uniqueCoursesFile = "../data/uniqueCourses.json";

const formatSubjects = async () => {
  const files = await fs.promises.readdir(coursesDir);

  // Loop them all with the new for...of
  for await (const file of files) {
    const data = JSON.parse(fs.readFileSync(`../data/courses/${file}`, "utf8"));
    try {
      for (const course of data) {
        course.id = createId();
        if (!course.data) {
          course.data = {};
          course.data.name = course.name;
          course.data.description = course.description;

          delete course.name;
          delete course.description;
        }
        course.parent = {};
        course.parent.name = file.split(".")[0];
        const courses = JSON.parse(fs.readFileSync(coursesFile, "utf8"));
        courses.push(course);
        fs.writeFileSync(coursesFile, JSON.stringify(courses));
      }
    } catch (err) {
      console.log(err, "in ", file);
    }
  }
  console.log("COMPLETED");
};

// formatSubjects();

// step two remove duplicates
const findDuplicates = () => {
  const courses = JSON.parse(fs.readFileSync(coursesFile, "utf8"));
  const duplicates = [];
  const unique = [];
  const uniqueCourses = [];
  for (const course of courses) {
    if (unique.includes(course.data.name)) {
      duplicates.push(course);
    } else {
      unique.push(course.data.name);
      uniqueCourses.push(course);
    }
  }
  console.log("duplicates", duplicates.length);
  console.log("unique", unique.length);
  fs.writeFileSync(uniqueCoursesFile, JSON.stringify(uniqueCourses));
};

// findDuplicates();

// step three format pre-reqs

const addIdstoPreReqs = () => {
  const courses = JSON.parse(fs.readFileSync(uniqueCoursesFile, "utf8"));
  for (const course of courses) {
    if (course.prerequisites) {
      const newPreReqs = [];
      for (let preReq of course.prerequisites) {
        if (course.prerequisites.length && preReq) {
          const found = courses.find((c) => c.data.name === preReq);
          if (found) {
            preReq = {};
            preReq.name = found.data.name;
            preReq.id = found.id;
            newPreReqs.push(preReq);
          } else {
            console.log("not found", preReq);
          }
        }
      }
      course.prerequisites = newPreReqs;
    }
  }
  fs.writeFileSync(uniqueCoursesFile, JSON.stringify(courses));
  console.log("COMPLETED");
};

// addIdstoPreReqs();

const getParentId = () => {
  const courses = JSON.parse(fs.readFileSync(uniqueCoursesFile, "utf8"));
  const subjects = JSON.parse(fs.readFileSync(subjectsFile, "utf8"));

  for (const course of courses) {
    if (course.parent) {
      const found = subjects.find((c) => c.data.name === course.parent.name);
      if (found) {
        course.parent.id = found.id;
      } else {
        console.log("not found", course.parent.name);
      }
    }
  }
  fs.writeFileSync(uniqueCoursesFile, JSON.stringify(courses));
  console.log("COMPLETED");
};

getParentId();
