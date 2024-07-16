import { RouterProvider } from "react-router-dom";
import { router } from "../../app.routes";
import { ScenesProvider, StoriesProvider } from "../../../story/providers";

export const RootView = () => {
  return (
    <StoriesProvider>
      <ScenesProvider>
        <RouterProvider router={router}></RouterProvider>
      </ScenesProvider>
    </StoriesProvider>
  );
};
