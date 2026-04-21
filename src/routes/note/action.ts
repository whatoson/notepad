import { localNotesRepository } from "@/services/localNotesRepository";
import {
  data,
  type ActionFunctionArgs,
  type UNSAFE_DataWithResponseInit,
} from "react-router";

export interface ActionResult {
  ok?: boolean;
  redirectTo?: string;
  errors?: Record<string, string>;
}

export async function noteAction({
  request,
}: ActionFunctionArgs): Promise<UNSAFE_DataWithResponseInit<ActionResult>> {
  const method = request.method.toUpperCase();
  const formData = await request.formData();

  if (method === "POST") {
    const errors = validateFormData(formData);

    if (Object.keys(errors).length > 0) {
      return data({ errors }, { status: 400 });
    }

    const note = await localNotesRepository.createNote({
      title: formData.get("title") as string,
    });
    return data({
      ok: true,
      redirectTo: `/note/${note.id}`,
    });
  }

  return data(
    {
      errors: { method: "Method not allowed" },
    },
    {
      status: 400,
    },
  );
}

function validateFormData(formData: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  const title = formData.get("title") as string;
  if (!title || title.trim() === "") {
    errors.title = "Title is required";
  }

  return errors;
}
