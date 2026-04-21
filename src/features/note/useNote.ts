import type { ActionResult } from "@/routes/note/action";
import type {
  CreateNoteRequest,
  DeleteNoteRequest,
  UpdateNoteRequest,
} from "@/routes/note/actionSchema";
import { useFetcher } from "react-router";

export function useNote() {
  const fetcher = useFetcher<ActionResult>();

  const createNote = (data: Omit<CreateNoteRequest, "intent">) => {
    const payload: CreateNoteRequest = {
      intent: "create",
      ...data,
    };

    void fetcher.submit(payload, { method: "POST", action: "/note" });
  };

  const updateNote = (data: Omit<UpdateNoteRequest, "intent">) => {
    const payload: UpdateNoteRequest = {
      intent: "update",
      ...data,
    };

    void fetcher.submit(payload, { method: "POST", action: "/note" });
  };

  const deleteNote = (data: Omit<DeleteNoteRequest, "intent">) => {
    const payload: DeleteNoteRequest = {
      intent: "delete",
      ...data,
    };

    void fetcher.submit(payload, { method: "POST", action: "/note" });
  };

  return {
    Form: fetcher.Form,
    isLoading: fetcher.state !== "idle",
    result: fetcher.data,
    errors: fetcher.data?.errors,
    createNote,
    updateNote,
    deleteNote,
  };
}
