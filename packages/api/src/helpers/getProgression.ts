import { StructuredOutputParser } from "langchain/output_parsers";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

import { z } from "zod";

export const getProgression = async (subject: string, parent: string) => {
  // We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
  const parser = StructuredOutputParser.fromZodSchema(
    z.array(
      z.object({
        name: z.string().describe("name of the course"),
        description: z.string().describe("description of the course"),
        prerequisites: z
          .array(z.string())
          .describe("prerequisites of the course"),
      }),
    ),
  );
  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Answer the users question as best as possible.\n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: {
      format_instructions: formatInstructions,
    },
  });

  const model = new OpenAI({ maxTokens: 2800 });

  const input = await prompt.format({
    subject,
    parent,
    question: `Please list the progression of courses an undergraduate student should take to learn ${subject} in the larger field of ${parent}. 
    
    Please list the courses in the order a student would usually take them. Please send back only an ordered two-dimensional array of the recommended courses with the first element in the array being the first course the student should take, the second element being the second course (or courses) a student should take, and so on for each course.
    
    If courses can be taken concurrently, put them in an array inside of the main array. Each course should be an object with three keys, a name, for the course name, a description, for the course description, and prerequisites, which should be an array of courses a student should take before attempting this course. Any course a student should take before this course should be in the array.

    If done correctly, courses should get progressively more advanced, with each courses prerequisites listed in the array before it. An advanced course should have many courses listed in the prerequisites array. A basic course should have no or very few courses listed in the prerequisites array. Please do not send an advanced course with only one element in the prerequisites array.
    `,
  });
  const response = await model.call(input);

  const startOfArray = response.indexOf("[");
  const endOfArray = response.lastIndexOf("]");

  const array = response.slice(startOfArray, endOfArray + 1);

  console.log(array);

  return array;
};
