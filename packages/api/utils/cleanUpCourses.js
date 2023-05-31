const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");
const coursesDir = "../data/courses";
const coursesFile = "../data/courses.json";

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

formatSubjects();

// step two remove duplicates

// step three format pre-reqs
