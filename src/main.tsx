import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Multiselect } from "./components/Multiselect.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Multiselect />
  </React.StrictMode>,
);
