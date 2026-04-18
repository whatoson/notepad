import { createHashRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { EmptyPage } from "./pages/EmptyPage";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createHashRouter([
  {
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: EmptyPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
