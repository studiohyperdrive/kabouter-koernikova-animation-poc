import { RouterProvider } from "react-router-dom";
import { router } from "../../app.routes";
import { ScenesProvider } from "../../../story/providers";

export const RootView = () => {
  return (
    <ScenesProvider>
      <RouterProvider router={router}></RouterProvider>
    </ScenesProvider>
  );
};
