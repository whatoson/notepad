import { createHashRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { EmptyPage } from "./pages/EmptyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createHashRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: EmptyPage },
      { path: "note/:noteId", Component: NotFoundPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
