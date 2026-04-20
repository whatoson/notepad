import { createHashRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { EmptyPage } from "./pages/EmptyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EditorPage } from "./pages/EditorPage";
import { localNotesRepository } from "./services/localNotesRepository";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createHashRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: EmptyPage },
      {
        path: "note/:noteId",
        Component: EditorPage,
        ErrorBoundary: ErrorPage,
        loader: async ({ params }) => {
          if (!params.noteId) {
            throw new Error("Note ID is required");
          }
          return await localNotesRepository.getNoteContent(params.noteId);
        },
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
