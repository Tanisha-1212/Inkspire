import API from "./api";

export const getUserProfile = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data.user;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    throw err.response?.data || { message: "Failed to fetch user profile" };
  }
};

export const updateProfile = async (data) => {
    try {
        const response = await API.put("/users/update", data);
        return response.data.user;
    } catch (err) {
        console.error("Error Updating User Profile", err);
        throw err.response?.data || {message: "Failed to Update user profile"};
    }
};

export  const followUser = async (id) => {
    try {
        const response = await API.post(`/users/${id}/follow`);
        return response.data;
    } catch (err) {
        console.error("Error Following User", err);
        throw err.response?.data || {message: "Failed to Follow user profile"};
    }
}

export const unfollowUser = async(id) => {
    try {
        const response = await API.post(`/users/${id}/unfollow`);
        return response.data;
    } catch (err) {
        console.error("Error Unfollowing User", err);
        throw err.response?.data || {message: "Failed to Unfollow user profile"};
    }
};

export const getFollowers = async(id) => {
    try {
        const response = await API.get(`/users/${id}/followers`);
        return response.data.followers;
    } catch (err) {
        console.error("Error fetching followers", err);
        throw err.response?.data || {message: "Failed to fetch followers"};
    }
};

export const getFollowing = async (id) => {
    try {
        const response = await API.get(`/users/${id}/following`);
        return response.data.following;
    } catch (err) {
        console.error("Error fetching following users", err);
        throw err.response?.data || {message: "Failed to fetch following users"};
    }
};

export const getBlogByUser = async (id) => {
    try {
        const response = await API.get(`/users/${id}/blogs`);
        return response.data.blogs;
    } catch (err) {
        console.error("Error fetching Blogs", err);
        throw err.response?.data || {message: "Failed to fetch blogs"};
    }
};