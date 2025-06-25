import { resolver } from "@blitzjs/rpc";
import db from "db";
import { DeleteChatHistorySchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(DeleteChatHistorySchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const chatHistory = await db.ChatHistory.deleteMany({ where: { id } });

    return chatHistory;
  }
);
