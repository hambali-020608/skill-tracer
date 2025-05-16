import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetSkill = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetSkill),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skill = await db.skill.findFirst({ where: { id } });

    if (!skill) throw new NotFoundError();

    return skill;
  }
);
