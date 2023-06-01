import fs from "fs";
import path from "path";
import { protectedProcedure, router } from "../../trpc";
import { getProgression } from "../../helpers/getProgression";

const subjects = path.join(process.cwd(), "../../packages/data/subjects.json");

const data = JSON.parse(fs.readFileSync(subjects, "utf8"));
export const coursesRouter = router({
  newProgression: protectedProcedure.mutation(async () => {
    try {
      for (const subject of data) {
        console.log("firing");
        const result = await getProgression(
          subject.data.name,
          subject.parent.data.name,
        );
        fs.appendFileSync(
          path.join(
            process.cwd(),
            `../../packages/data/courses/${subject.data.name}.json`,
          ),
          result,
        );
        console.log("finished", data[subject], " of ", data.length);
      }
    } catch (error) {
      console.log(error);
    }

    return "Completed!";
  }),
});
