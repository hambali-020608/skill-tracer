import { z } from "zod";

export const CreateSkillSchema = z.object({
  skillName:z.string(),
    startDate: z.coerce.date(), 
  targetDate: z.coerce.date(), 
  totalDays: z.number(),
  isDone: z.boolean().optional(),
});
export const UpdateSkillSchema = CreateSkillSchema.merge(
  z.object({
    id: z.number(),
  })
);

export const DeleteSkillSchema = z.object({
  id: z.number(),
});
