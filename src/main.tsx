import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MultiselectDemo } from "./MultiselectDemo.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MultiselectDemo />
    <ToastContainer />
  </React.StrictMode>,
);
