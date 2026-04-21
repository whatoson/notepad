import { localNotesRepository } from "@/services/localNotesRepository";
import { type ActionFunctionArgs } from "react-router";

export interface ActionResult {
  ok?: boolean;
  errors?: Record<string, string>;
}

export async function noteIdAction(
  args: ActionFunctionArgs,
): Promise<ActionResult> {
  const method = args.request.method.toUpperCase();

  if (method === "DELETE") {
    return onDelete(args);
  }

  return {
    errors: {
      method: "Method not allowed",
    },
  };
}

async function onDelete({ params }: ActionFunctionArgs): Promise<ActionResult> {
  const id = params.noteId ?? "";

  if (!id) {
    return {
      errors: {
        id: "ID not found",
      },
    };
  }

  await localNotesRepository.deleteNote(id);
  return {
    ok: true,
  };
}
