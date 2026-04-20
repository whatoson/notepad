import { createHashRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { EmptyPage } from "./pages/EmptyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EditorPage, type EditorPageLoaderData } from "./pages/EditorPage";
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
        loader: async ({ params }): Promise<EditorPageLoaderData> => {
          if (!params.noteId) {
            throw new Error("Note ID is required");
          }
          const content = await localNotesRepository.getNoteContent(
            params.noteId,
          );
          return {
            id: params.noteId,
            content,
          };
        },
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
