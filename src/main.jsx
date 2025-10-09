import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import VetClinicChatbot from "./components/VetClinicChatbot.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <VetClinicChatbot />
  </StrictMode>
);
