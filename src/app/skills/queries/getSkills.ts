import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetSkillsInput
  extends Pick<
    Prisma.SkillFindManyArgs,
    "where" | "orderBy" | "skip" | "take" | "include"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSkillsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: skills,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.skill.count({ where }),
      query: (paginateArgs) =>
        db.skill.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      skills,
      nextPage,
      hasMore,
      count,
    };
  }
);
