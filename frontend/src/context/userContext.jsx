import { createContext, useContext, useState } from "react";
import {
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getBlogByUser,
} from "../api/userApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user profile
  const fetchUserProfile = async (id) => {
    setLoading(true);
    try {
      const user = await getUserProfile(id);
      setProfile(user);
      return user;
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update profile
  const updateUserProfile = async (data) => {
    try {
      const updated = await updateProfile(data);
      setProfile(updated);
      return updated;
    } catch (err) {
      console.error("Failed to update profile:", err);
      throw err;
    }
  };

  // ✅ Follow user
  const follow = async (id) => {
    try {
      await followUser(id);
      setFollowing((prev) => [...prev, id]);
    } catch (err) {
      console.error("Failed to follow user:", err);
      throw err;
    }
  };

  // ✅ Unfollow user
  const unfollow = async (id) => {
    try {
      await unfollowUser(id);
      setFollowing((prev) => prev.filter((uid) => uid !== id));
    } catch (err) {
      console.error("Failed to unfollow user:", err);
      throw err;
    }
  };

  // ✅ Get followers of a user
  const fetchFollowers = async (id) => {
    try {
      const data = await getFollowers(id);
      setFollowers(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch followers:", err);
      throw err;
    }
  };

  // ✅ Get following of a user
  const fetchFollowing = async (id) => {
    try {
      const data = await getFollowing(id);
      setFollowing(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch following:", err);
      throw err;
    }
  };

  // ✅ Get blogs of a user
  const fetchUserBlogs = async (id) => {
    setLoading(true);
    try {
      const blogs = await getBlogByUser(id);
      setUserBlogs(blogs);
      return blogs;
    } catch (err) {
      console.error("Failed to fetch user blogs:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        followers,
        following,
        userBlogs,
        loading,
        fetchUserProfile,
        updateUserProfile,
        follow,
        unfollow,
        fetchFollowers,
        fetchFollowing,
        fetchUserBlogs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
