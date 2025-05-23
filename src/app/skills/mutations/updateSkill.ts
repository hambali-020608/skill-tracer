import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateSkillSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(UpdateSkillSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skill = await db.skill.update({ where: { id }, data });

    return skill;
  }
);
