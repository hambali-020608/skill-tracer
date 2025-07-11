import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Progress = z.object({
  log_date: z.coerce.date(),
  skillId: z.number(),
  note: z.string(),
  isChecked:z.boolean()
});

export default resolver.pipe(
  resolver.zod(Progress),
  resolver.authorize(),
  async (input) => {
    // console.log("INPUTNYA", input)
    const Progress = await db.progress.create({ data: input });

    
    return Progress;
  
  }
);
