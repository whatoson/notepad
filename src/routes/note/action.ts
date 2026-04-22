import type { ActionFunctionArgs } from "react-router";
import { NoteActionSchema } from "./actionSchema";
import { localNotesRepository } from "@/services/localNotesRepository";

export interface ActionResult {
  ok?: boolean;
  errors?: Record<string, string>;
}

export async function noteAction({
  request,
}: ActionFunctionArgs): Promise<ActionResult> {
  let formData;
  let rawData;
  if (request.headers.get("Content-Type") === "application/json") {
    formData = (await request.json()) as unknown;
    rawData = formData;
  } else {
    formData = await request.formData();
    rawData = Object.fromEntries(formData);
  }

  const result = NoteActionSchema.safeParse(rawData);

  if (!result.success) {
    return {
      errors: result.error.issues.reduce(
        (acc, issue) => {
          const path = issue.path[0] as string;
          acc[path] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      ),
    };
  }

  const data = result.data;
  console.log(data);

  switch (data.intent) {
    case "create":
      await localNotesRepository.createNote({ title: data.title });
      break;
    case "update":
      await localNotesRepository.updateNote({
        id: data.id,
        title: data.title,
        content: data.content ?? undefined,
      });
      break;
    case "delete":
      await localNotesRepository.deleteNote(data.id);
      break;
  }
  return { ok: true };
}
