const { Configuration, OpenAIApi } = require("openai");
const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");
const subjects = "../data/subjects.json";
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../../.env") });

const data = JSON.parse(fs.readFileSync(subjects, "utf8"));

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getCourseProgression = async (data) => {
  try {
    const configuration = new Configuration({
      organization: "org-2RXUwEw2a3Hf0KBwkJIRbzFm",
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    for (const subject of data) {
      console.log("firing");
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `The following is a conversation with an AI assistant. The assistant is a very experienced college professor of ${subject.data.name} in the larger field of ${subject.parent.data.name}. The assistant is helpful and very friendly. The assistant is eager to help you learn more about ${subject.data.name} in the larger field of ${subject.parent.data.name}.`,
          },
          {
            role: "user",
            content: `
            Please list the progression of courses an undergraduate student should take to learn ${subject.data.name} in the larger field of ${subject.parent.data.name}.

             Please list the courses from above in the order a student would usually take them. Some courses can be taken at the same time. Some courses are prerequisites of other courses. Please list the courses in the order a student would usually take them.
            
             Please send back only an ordered two-dimensional array of the recommended courses with the first element in the array being the first course the student should take, the second element being the second course (or courses) a student should take, and so on for each course.
             
             If courses can be taken concurrently, put them in an array inside of the main array. Each course should be an object with three keys, a name, for the course name, a description, for the course description, and prerequisites, which should be an array of courses a student should take before attempting this course. Any course a student should take before this course should be in the array. 

             If done correctly, courses should get progressively more advanced, with each courses prerequisites listed in the array before it. An advanced course should have many courses listed in the prerequisites array. A basic course should have no or very few courses listed in the prerequisites array. Please do not send an advanced course with only one element in the prerequisites array.
             
             Please only send the ordered array without any other text. Please do not send any text before the ordered array. Please do not send any text after the ordered array. 
             
             If there is not a progression of courses you can recommend, please send an empty object like so: [] For every response where you can recommend a progression of courses, there should be some courses that can be taken at the same time, which means there should be at least one array inside the main array.
            
            For example, if a student wanted to study Cellular Biology in the context of Biology, you would send back the following:
            
            [
              { 
              "name": "Introductory Biology",
              "description": "This course introduces students to the principles of biology. Students will learn about the scientific method, the structure and function of cells, the structure and function of DNA, the structure and function of proteins, the structure and function of organelles, the structure and function of tissues, the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": []
            },
            [  {
              "name": "Cell Biology",
              "description": "This course introduces students to the principles of cell biology. Students will learn about the structure and function of cells, the structure and function of DNA, the structure and function of proteins, the structure and function of organelles, the structure and function of tissues, the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prequisites": ["Introductory Biology"]
            },
            
            {
              "name": "Molecular Biology",
              "description": "This course introduces students to the principles of molecular biology. Students will learn about the structure and function of DNA, the structure and function of proteins, the structure and function of organelles, the structure and function of tissues, the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology"]
            },
            {
              "name": "Genetics",
              "description": "This course introduces students to the principles of genetics. Students will learn about the structure and function of DNA, the structure and function of proteins, the structure and function of organelles, the structure and function of tissues, the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology"]
            }, 
          ],
            {
              "name": "Biochemistry",
              "description": "This course introduces students to the principles of biochemistry. Students will learn about the structure and function of proteins, the structure and function of organelles, the structure and function of tissues, the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics"]
            },
            [
              {
                "name": "Cell Physiology",
                "description": "This course introduces students to the principles of cell physiology. Students will learn about the structure and function of organelles, the structure and function of tissues, the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
                "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics", "Biochemistry"]
              },
              {
                "name": "Developmental Biology",
                "description": "This course introduces students to the principles of developmental biology. Students will learn about the structure and function of tissues, the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
                "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics", "Biochemistry"]
              },
            ],
       
            {
              "name": "Immunology",
              "description": "This course introduces students to the principles of immunology. Students will learn about the structure and function of organs, the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics", "Biochemistry", "Cell Physiology", "Developmental Biology"]
            },
            [ 
              {
              "name": "Cancer Biology",
              "description": "This course introduces students to the principles of cancer biology. Students will learn about the structure and function of organ systems, the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics", "Biochemistry", "Cell Physiology", "Developmental Biology", "Immunology"]
            },
            {
              "name": "Neurobiology",
              "description": "This course introduces students to the principles of neurobiology. Students will learn about the structure and function of organisms, the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics", "Biochemistry", "Cell Physiology", "Developmental Biology", "Immunology"]
            },
             {
              "name": "Stem Cell Biology",
              "description": "This course introduces students to the principles of stem cell biology. Students will learn about the structure and function of populations, the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics", "Biochemistry", "Cell Physiology", "Developmental Biology", "Immunology"]
             },
             {
              "name": "Microbiology",
              "description": "This course introduces students to the principles of microbiology. Students will learn about the structure and function of communities, the structure and function of ecosystems, the structure and function of the biosphere, the structure and function of the earth, the structure and function of the solar system, the structure and function of the galaxy, the structure and function of the universe, the structure and function of time, the structure and function of space, the structure and function of matter, the structure and function of energy, the structure and function of life, and the structure and function of death."
              "prerequisites": ["Introductory Biology", "Cell Biology", "Molecular Biology", "Genetics", "Biochemistry", "Cell Physiology", "Developmental Biology", "Immunology"]
             }
            ],
            ]`,
          },
        ],
      });
      console.log(response.data.choices[0]?.message?.content);

      const content = response.data.choices[0]?.message?.content;

      const startOfArray = content.indexOf("[");
      const endOfArray = content.lastIndexOf("]");

      const array = content.slice(startOfArray, endOfArray + 1);

      fs.appendFileSync(`../data/courses/${subject.data.name}.json`, array);
      console.log("Written to file!");
      console.log("Sleeping...");
      await sleep(65000);
    }
  } catch (error) {
    console.log(error);
    return error;
  }

  fs.writeFileSync(subjects, JSON.stringify(data));
  console.log("Success!");
};

getCourseProgression(data);
