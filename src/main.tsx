import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { CarouselProvider } from "./context/CarouselProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CarouselProvider>
      <App />
    </CarouselProvider>
  </StrictMode>
);
