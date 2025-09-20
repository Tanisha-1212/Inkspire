import {createContext, useContext, useState, useEffect} from 'react';
import {getNotification, markAsRead, createNotification} from '../api/notificationApi';

const NotificationContext = createContext();

export const NotificationProvider = ({childern}) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    })

    const fetchNotifications = async() => {
        setLoading(true);
        try {
            const data = await getNotification();
            setNotifications(data);
        } catch (err) {
            console.error("failed to fetch notifications", err);
        } finally{
            setLoading(false);
        }
    };

    const markNotificationAsRead = async (id) => {
       try {
            const updatedNotification = await markAsRead(id);
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? updatedNotification : n))
            );
       } catch (err) {
            console.error("Failed to mark notification as read:", err);
       }
    };

    const createNewNotification = async() => {
        try {
            const newNotification = await createNotification();
            setNotifications((prev) => [newNotification, ...prev]);
        } catch (err) {
            console.error("Failed to create notification:", err);
        }
    }

    const unreadCount = notifications.filter((n) => !n.read).length;

    return(
        <NotificationContext.Provider
            value={{
                notifications,
                loading,
                unreadCount,
                fetchNotifications,
                markNotificationAsRead,
                createNewNotification
            }}>
            {childern}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);