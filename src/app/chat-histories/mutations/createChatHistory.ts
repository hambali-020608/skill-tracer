import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateChatHistorySchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateChatHistorySchema),
  resolver.authorize(),
  async (input,ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const chatHistory = await db.ChatHistory.create({ data:{
      ...input,
      userId:ctx.session.userId
    } });

    return chatHistory;
  }
);
