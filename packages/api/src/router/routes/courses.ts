// import { z } from "zod";
// import { protectedProcedure, publicProcedure, router } from "../../trpc";
// import { prisma } from "@acme/db";
// import { Configuration, OpenAIApi } from "openai";

// export const coursesRouter = router({
//   get: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .query(async ({ input }) => {
//       try {
//         const course = await prisma?.courses.findFirst({
//           where: { id: input.id },
//         });

//         return course;
//       } catch (error) {
//         console.error(error);
//         return error;
//       }
//     }),
//   create: protectedProcedure
//     .input(z.object({ title: z.string() }))
//     .mutation(async ({ input }) => {
//       try {
//         const configuration = new Configuration({
//           organization: "org-2RXUwEw2a3Hf0KBwkJIRbzFm",
//           apiKey: process.env.OPENAI_API_KEY,
//         });
//         const openai = new OpenAIApi(configuration);
//         const response = await openai.createChatCompletion({
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "system",
//               content: `The following is a conversation with an AI assistant. The assistant is a very experienced college professor of ${input.title}. The assistant is helpful and very friendly.`,
//             },
//             {
//               role: "user",
//               content: `Please create a syllabus for an undergraduate course called '${input.title}' with a description, learning objectives, and for all 8 weeks of the course, please recommend readings and videos. For the readings, please give the title, author, ISBN number, and a link to amazon to purchase the book. For the videos, please send the title of the video, the creator, and a link to Youtube where it can be viewed. Please send the response as a JSON object. Just the JSON. Send nothing before it and nothing after it. The key for the course description should be 'description', the key for the learning objectives should be 'learningObjectives'. There should be an array called 'weeks' for the 8 weeks of the course. The key for each week should be 'week_number'.`,
//             },
//           ],
//         });
//         console.log(response.data.choices[0]?.message?.content);

//         const course = JSON.parse(
//           response.data.choices[0]?.message?.content as string,
//         );

//         await prisma.suggestedCourses.create({
//           data: {
//             name: input.title,
//             description: course?.description,
//             learningObjectives: course?.learningObjectives,
//             syllabus: course?.weeks,
//           },
//         });
//         return response.data.choices;
//       } catch (error) {
//         console.log(error);
//         return error;
//       }
//     }),
// });

export {};
