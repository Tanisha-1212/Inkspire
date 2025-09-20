import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import all context providers
import { AuthProvider } from "./context/authContext";
import { BlogProvider } from "./context/blogContext";
import { UserProvider } from "./context/userContext";
import { NotificationProvider } from "./context/notificationContext";
import { ThemeProvider } from "./context/themeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <UserProvider>
            <BlogProvider>
              <App />
            </BlogProvider>
          </UserProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);

