import { z } from "zod";

const BaseSchema = z.object({
  id: z.uuid("ID is not valid"),
});

const CreateSchema = z.object({
  intent: z.literal("create"),
  title: z.string().min(3, "Title must be at least 3 characters long").max(100),
});

const UpdateSchema = BaseSchema.extend({
  intent: z.literal("update"),
  title: z.string().min(3, "Title must be at least 3 characters long").max(100),
});

const DeleteSchema = BaseSchema.extend({
  intent: z.literal("delete"),
});

export const NoteActionSchema = z.discriminatedUnion("intent", [
  CreateSchema,
  UpdateSchema,
  DeleteSchema,
]);

export type CreateNoteRequest = z.infer<typeof CreateSchema>;
export type UpdateNoteRequest = z.infer<typeof UpdateSchema>;
export type DeleteNoteRequest = z.infer<typeof DeleteSchema>;
