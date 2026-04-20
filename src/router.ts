import { createHashRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { EditorPage } from "./pages/EditorPage";
import { EmptyPage } from "./pages/EmptyPage";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { mainLayoutLoader } from "./routes/loader";
import { noteIdLoader } from "./routes/note/noteId/loader";
import { noteAction } from "./routes/note/action";
import { noteIdAction } from "./routes/note/noteId/action";

export const router = createHashRouter([
  {
    Component: MainLayout,
    loader: mainLayoutLoader,
    children: [
      { index: true, Component: EmptyPage },
      {
        path: "note/",
        action: noteAction,
        children: [
          {
            path: ":noteId",
            Component: EditorPage,
            ErrorBoundary: ErrorPage,
            action: noteIdAction,
            loader: noteIdLoader,
          },
        ],
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
