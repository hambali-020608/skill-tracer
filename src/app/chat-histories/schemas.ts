import { z } from "zod";

export const CreateChatHistorySchema = z.object({
  // id:z.number(),
  skillId:z.number(),
  type: z.enum(["SKILL", "AI"]), // jika kamu pisahkan tipe chat
  message:z.string(),
  response:z.string()




  // template: __fieldName__: z.__zodType__(),
});
export const UpdateChatHistorySchema = CreateChatHistorySchema.merge(
  z.object({
    id: z.number(),
    
  })
);

export const DeleteChatHistorySchema = z.object({
  id: z.number(),
});
