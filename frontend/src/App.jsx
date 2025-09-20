import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/authContext";
import { BlogProvider } from "./context/blogContext";
import { UserProvider } from "./context/userContext";
import { NotificationProvider } from "./context/notificationConetxt";
import { ThemeProvider  } from './context/themeContext';

export default function App(){
  return(
     <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <UserProvider>
            <BlogProvider>{children}</BlogProvider>
          </UserProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}