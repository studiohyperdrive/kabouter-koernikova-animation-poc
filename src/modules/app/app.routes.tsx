import { createBrowserRouter } from "react-router-dom";
import { AppView } from "./views";
import { APP_PATHS } from "./app.paths";
import { StoriesOverview, StoryView } from "../story/views";

export const router = createBrowserRouter([
  { path: APP_PATHS.root, element: <AppView /> },
  { path: APP_PATHS.overview, element: <StoriesOverview /> },
  { path: APP_PATHS.story, element: <StoryView /> },
]);
