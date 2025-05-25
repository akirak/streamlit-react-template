import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MyComponent from "./MyComponent.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MyComponent />
  </StrictMode>
);
