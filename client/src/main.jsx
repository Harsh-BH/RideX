import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App2.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppKitProvider from "./context/AppKitProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppKitProvider>
        <App />
      </AppKitProvider>
    </BrowserRouter>
  </React.StrictMode>
);
