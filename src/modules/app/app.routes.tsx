import { createBrowserRouter, Navigate } from "react-router-dom";
import { APP_PATHS } from "./app.paths";
import { StoriesOverview, StoryView } from "../story/views";

export const router = createBrowserRouter([
  {
    path: APP_PATHS.root,
    element: <Navigate replace to={APP_PATHS.overview} />,
  },
  { path: APP_PATHS.overview, element: <StoriesOverview /> },
  { path: APP_PATHS.story, element: <StoryView /> },
]);
