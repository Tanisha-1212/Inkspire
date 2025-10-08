import API from "./api";

export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("category", blogData.category);
    formData.append("tags", JSON.stringify(blogData.tags || []));
    if (blogData.image) {
      formData.append("image", blogData.image); // ✅ match backend field
    }

    const response = await API.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.blog;
  } catch (err) {
    console.error("Error creating blog:", err);
    throw err.response?.data || err;
  }
};

export const getAllBlogs = async (data) => {
    try {
        const response = await API.get("/blogs", data);
        return response.data.blogs;
    } catch (err) {
        console.error("Error fetching Blogs", err);
        throw err.response?.data || {message: "Failed to fetch blogs"};
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await API.get(`/blogs/${id}`);
        return response.data.blog;
    } catch (err) {
        console.error("Error fetching Blog", err);
        throw err.response?.data || {message: "Failed to fetch blog"};
    }
};

export const updateBlog = async (id) => {
    try {
        const response = await API.put(`/blogs/${id}`);
        return response.data.blog;
    } catch (err) {
        console.error("Error Updating Blogs", err);
        throw err.response?.data || {message: "Failed to update blogs"};
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await API.delete(`/blogs/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error deleting Blogs", err);
        throw err.response?.data || {message: "Failed to delete blogs"};
    }
};

export const likeBlog = async (id) => {
    try {
        const response = await API.put(`/blogs/${id}/like`);
        return response.data.likesCount;
    } catch (err) {
        console.error("Error liking Blogs", err);
        throw err.response?.data || {message: "Failed to like blogs"};
    }
};

export const getBlogByFilter = async (filters) => {
    try {
        const response = await API.get("/blogs/filter", {params: filters});
        return response.data.blogs;
    } catch (err) {
        console.error("Error fetching Blogs", err);
        throw err.response?.data || {message: "Failed to fetch blogs"};
    }
};

export const getBlogLikes = async (id) => {
    try {
        const response = await API.get(`/blogs/${id}`);
        return response.data.likes;
    } catch (err) {
        console.error("Error fetching likes", err);
        throw err.response?.data || {message: "Failed to fetch likes"};        
    }
};