import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
// import { DeleteSkillSchema } from "../schemas";
const deleteProgress = z.object({
  id: z.number()
});


export default resolver.pipe(
  resolver.zod(deleteProgress),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const progress= await db.progress.deleteMany({ where: { id } });

    return progress;
  }
);
