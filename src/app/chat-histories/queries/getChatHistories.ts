import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetChatHistoriesInput
  extends Pick<
    Prisma.ChatHistoryFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetChatHistoriesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: chatHistories,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.ChatHistory.count({ where }),
      query: (paginateArgs) =>
        db.ChatHistory.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      chatHistories,
      nextPage,
      hasMore,
      count,
    };
  }
);
