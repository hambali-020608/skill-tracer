import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateChatHistorySchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(UpdateChatHistorySchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const chatHistory = await db.ChatHistory.update({ where: { id }, data });

    return chatHistory;
  }
);
