import API from "./api";

export const addComment = async (id, data) => {
    try {
        const response = await API.post(`/comments/${id}`, data);
        return response.data;
    } catch (err) {
        console.error("Error adding comment:", err);
    throw err.response?.data || { message: "Failed to add comment" };
    }
};

export const getCommentByBlog = async (id) => {
    try {
        const response = await API.get(`/comments/blog/${id}`);
        return response.data.comments;
    } catch (err) {
        console.error("Error fetch comment:", err);
    throw err.response?.data || { message: "Failed to fetch comment" };
    }
};

export const updateComment = async (id) => {
    try {
        const response = await API.put(`/comments/${id}`);
        return response.data.comment;
    } catch (err) {
        console.error("Error updating comment:", err);
    throw err.response?.data || { message: "Failed to update comment" };
    }
};

export const deleteComment = async (id) => {
    try {
        const response = await API.delete(`/comments/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error deleting comment:", err);
    throw err.response?.data || { message: "Failed to delete comment" };
    }
};