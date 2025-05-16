import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateSkillSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateSkillSchema),
  resolver.authorize(),
  async (input,ctx) => {
    // console.log("input data skill nya: " + input)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skill = await db.skill.create({ data:{
      ...input,
      userId:ctx.session.userId
    } });

    
    return skill;
  }
);
