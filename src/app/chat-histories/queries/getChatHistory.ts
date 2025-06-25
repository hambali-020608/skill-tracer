import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetChatHistories = z.object({
  skillId: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetChatHistories),
  resolver.authorize(),
  async ({ skillId }) => {
    const chatHistories = await db.chatHistory.findMany({
      where: { skillId },
      orderBy: { createdAt: "desc" }, // opsional: urutkan berdasarkan waktu
    })

    return chatHistories
  }
)
