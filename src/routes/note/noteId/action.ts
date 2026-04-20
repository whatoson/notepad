import { localNotesRepository } from "@/services/localNotesRepository";
import { redirect, type ActionFunctionArgs } from "react-router";

export async function noteIdAction({ request }: ActionFunctionArgs) {
  const method = request.method.toUpperCase();
  const formData = await request.formData();

  if (method === "DELETE") {
    const id = formData.get("id") as string;
    const returnTo = formData.get("returnTo") as string;
    await localNotesRepository.deleteNote(id);
    if (!returnTo || returnTo === id) {
      return redirect("/");
    }
    return redirect(`/note/${returnTo}`);
  }
}
