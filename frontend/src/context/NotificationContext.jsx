import React, { createContext, useContext, useEffect, useState } from "react";
import { getNotification, createNotification, markAsRead } from "../api/notificationApi";

// Create context
const NotificationContext = createContext();

// Context provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotification();
      setNotifications(data);
    } catch (err) {
      setError(err.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  // Create a new notification
  const addNotification = async () => {
    try {
      const newNotification = await createNotification();
      setNotifications(prev => [newNotification, ...prev]); // add to top
    } catch (err) {
      console.error(err);
    }
  };

  // Mark a notification as read
  const readNotification = async (id) => {
    try {
      const updatedNotification = await markAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? updatedNotification : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Auto fetch on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        error,
        fetchNotifications,
        addNotification,
        readNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notifications
export const useNotifications = () => {
  return useContext(NotificationContext);
};
