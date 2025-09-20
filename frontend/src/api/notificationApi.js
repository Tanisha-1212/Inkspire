import API from "./api";

export const createNotification = async () => {
    try {
        const response = await API.post(`/notifications`);
        return response.data.notification;
    } catch (err) {
        console.error("Error creating notification:", err);
        throw err.response?.data || { message: "Failed to create notification" };
    }
};

export const getNotification = async () => {
    try {
        const response = await API.get(`/notifications`);
        return response.data.notifications;
    } catch (err) {
        console.error("Error fetching notifications:", err);
        throw err.response?.data || { message: "Failed to fetch notifications" };
    }
};

export const markAsRead = async (id) => {
    try {
        const response = await API.patch(`/notifications/${id}/read`);
        return response.data.notification;
    } catch (err) {
        console.error("Error reading notification:", err);
        throw err.response?.data || { message: "Failed to read notification" };
    }
};