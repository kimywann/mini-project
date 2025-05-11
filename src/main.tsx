import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TabProvider } from "./contexts/TabProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TabProvider>
      <App />
    </TabProvider>
  </StrictMode>
);
