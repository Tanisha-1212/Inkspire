import API from "./api";

export const registerUser = async(data) => {
    try{
        const response = await API.post("/auth/register", data);
        return response.data.user;
    }catch(err){
        console.error("Error resgistering:", err);
        throw err.response?.data || {message: "Failed to register"};
    }
};

export const loginUser = async(data) => {
    try {
        const response = await API.post("/auth/login", data);
        return response.data.user;
    } catch (err) {
        console.error("Error loging in", err);
        throw err.response?.data || {message: "Failed to login"};
    }
};

export const logout = async (data) => {
    try {
        const response = await API.post("/auth/logout", data);
        return response.data;
    } catch (err) {
        console.error("Error logging out", err);
        throw err.response?.data || {message: "Failed to logout"};
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await API.get("/auth/me");
        return response.data.user;
    } catch (err) {
        console.error("Error fetching current user", err);
        throw err.response?.data || {message: "Failed to fetch current user"};
    }
};