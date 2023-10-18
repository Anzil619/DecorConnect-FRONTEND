import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { Store, persistor } from "./Redux/store.jsx";
import { Provider } from "react-redux";
// For React query
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="112081783361-rqu5acn57psppur8ojlofp8guu3qr7hp.apps.googleusercontent.com">
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </React.StrictMode>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
