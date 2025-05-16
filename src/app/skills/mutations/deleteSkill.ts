import { resolver } from "@blitzjs/rpc";
import db from "db";
import { DeleteSkillSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(DeleteSkillSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skill = await db.skill.deleteMany({ where: { id } });

    return skill;
  }
);
