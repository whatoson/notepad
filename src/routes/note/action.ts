import { localNotesRepository } from "@/services/localNotesRepository";
import { redirect, type ActionFunctionArgs } from "react-router";

export async function noteAction({ request }: ActionFunctionArgs) {
  const method = request.method.toUpperCase();
  const formData = await request.formData();

  if (method === "POST") {
    const title = formData.get("title") as string;
    await localNotesRepository.createNote({ title });
    return redirect("/");
  }
}
