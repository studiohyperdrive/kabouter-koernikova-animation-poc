import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { RootView } from "./modules/app/views/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootView />
  </React.StrictMode>
);
