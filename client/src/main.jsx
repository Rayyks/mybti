import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "@/redux/store/store";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "@/context/modalContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
