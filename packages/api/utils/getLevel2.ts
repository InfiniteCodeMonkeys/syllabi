const { Configuration, OpenAIApi } = require("openai");
const { createId } = require("@paralleldrive/cuid2");
const fs = require("fs");
const subjects = "../data/subjectsAndDisciplines.json";
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../../.env") });

const data = JSON.parse(fs.readFileSync(subjects, "utf8"));

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getLevelTwo = async (data) => {
  try {
    const configuration = new Configuration({
      organization: "org-2RXUwEw2a3Hf0KBwkJIRbzFm",
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    for (const subject of data) {
      await sleep(90000);
      console.log("firing");
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `The following is a conversation with an AI assistant. The assistant is a very experienced college professor of ${subject.name}. The assistant is helpful and very friendly. The assistant knows how to send JSON objects like this one: {
                subdisciplines: [
                  {
                    name: 'Biostatistics',
                    description: 'The application of statistical methods to the study of human biology, health, and disease.',
                    parent: 'Statistics',
                    children: {}
                  },
                  {
                    name: 'Business Statistics',
                    description: 'The application of statistical methods to business and management decision-making.',
                    parent: 'Statistics',
                    children: {}
                  },
                  {
                    name: 'Econometrics',
                    description: 'The application of statistical methods to economic data to test theories or validate models.',
                    parent: 'Statistics',
                    children: {}
                  },
                  {
                    name: 'Mathematical Statistics',
                    description: 'The study of statistical theory, probability theory and the mathematical techniques used to analyze and interpret data.',
                    parent: 'Statistics',
                    children: {}
                  },
                  {
                    name: 'Social Statistics',
                    description: 'The application of statistical methods to social science data, including sociology, political science, and psychology.',
                    parent: 'Statistics',
                    children: {}
                  }
                ]
              }`,
          },
          {
            role: "user",
            content: `What are the subdisciplines of ${subject.name} if there are any, in the field of ${subject.name}? Please send only a JSON object with an array of the subdisciplines. The key for the array should be called "subdisciplines". Each subdiscipline should be an object with a name, a description, a parent property with the value of ${subject.name}, and a property called childern with the value of {}. Please only send the JSON object without any other text. Please do not send any text before the JSON object. Please do not send any text after the JSON object. If there is not a subdiscipline, please send an empty object like so: {}.`,
          },
        ],
      });
      console.log(response.data.choices[0]?.message?.content);

      const content = response.data.choices[0]?.message?.content;

      const startofJSON = content.indexOf("{");

      const json = content.slice(startofJSON);

      const childSubjects = JSON.parse(json);

      subject.children = childSubjects.subdisciplines;

      fs.appendFileSync(`../data/subjects/${subject.name}.json`, json);
      console.log("Written to file!");
      await sleep(180000);
    }
  } catch (error) {
    console.log(error);
    return error;
  }

  fs.writeFileSync(subjects, JSON.stringify(data));
  console.log("Success!");
};

getLevelTwo(data);
