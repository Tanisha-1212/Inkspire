import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useUser } from "../context/userContext";
import { useBlogs } from "../context/blogContext";
import { useNotifications } from "../context/NotificationContext";
import { Heart, Bell, PlusCircle } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const {
    profile,
    followers,
    following,
    userBlogs,
    fetchUserProfile,
    fetchFollowers,
    fetchFollowing,
    fetchUserBlogs,
    updateUserProfile,
  } = useUser();
  const { likeBlogPost } = useBlogs();
  const { notifications, fetchNotifications } = useNotifications();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editProfilePic, setEditProfilePic] = useState(null); // File object
  const [previewProfilePic, setPreviewProfilePic] = useState(""); // Preview URL
  const [showNotifications, setShowNotifications] = useState(false);

  // Load profile data
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const loadProfileData = async () => {
      setLoading(true);
      try {
        await fetchUserProfile(currentUser._id);
        await fetchFollowers(currentUser._id);
        await fetchFollowing(currentUser._id);
        await fetchUserBlogs(currentUser._id);
        await fetchNotifications();
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [currentUser]);

  // Set initial edit state
  useEffect(() => {
    if (profile) {
      setEditUsername(profile.username);
      setEditBio(profile.bio || "");
      setPreviewProfilePic(profile.profilePic || "/default-avatar.png");
    }
  }, [profile]);

  const handleLike = async (blogId) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    await likeBlogPost(blogId);
  };

  // Handle file selection for avatar
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProfilePic(file);
      setPreviewProfilePic(URL.createObjectURL(file)); // Preview selected image
    }
  };

  // Update profile
  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("username", editUsername);
      formData.append("bio", editBio);
      if (editProfilePic) formData.append("profilePic", editProfilePic);

      await updateUserProfile(formData); // Your context should handle FormData
      setEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  if (loading)
    return (
      <div className="bg-black min-h-screen text-center text-green-400">
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div className="text-center text-red-500 mt-20">User not found.</div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-2 relative flex flex-col">
      {/* 🔔 Notification + ➕ Create Blog Icons */}
      <div className="absolute top-6 right-6 flex flex-col items-center gap-3">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full bg-gray-900 border border-green-400 hover:bg-green-400 hover:text-black transition"
        >
          <Bell className="w-6 h-6" />
          {notifications.some((n) => !n.read) && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        <button
          onClick={() => navigate("/create-blog")}
          className="p-2 rounded-full bg-gray-900 border border-green-400 hover:bg-green-400 hover:text-black transition"
          title="Create New Blog"
        >
          <PlusCircle className="w-6 h-6" />
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-14 w-80 bg-gray-900 border border-green-400 rounded-xl shadow-lg shadow-green-400/30 overflow-hidden z-50">
            <div className="p-3 border-b border-green-400 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-green-400">
                Notifications
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-green-400 text-sm"
              >
                Close
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto p-3 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">
                  No notifications yet.
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2 rounded-md text-sm ${
                      n.read
                        ? "bg-gray-800 text-gray-300"
                        : "bg-green-400 text-black"
                    }`}
                  >
                    {n.message}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 mt-8">
        <img
          src={previewProfilePic}
          alt={profile.username}
          className="w-28 h-28 rounded-full object-cover border-2 border-green-400"
        />
        <div>
          {!editing ? (
            <>
              <h1 className="text-3xl font-bold text-green-400">
                {profile.username}
              </h1>
              <p className="text-gray-400">
                {profile.bio || "No bio available."}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-2 px-4 py-2 bg-green-400 text-black rounded-md font-semibold hover:bg-green-500 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                placeholder="Username"
                className="px-4 py-2 rounded-md bg-gray-900 text-white border border-green-400 focus:outline-none"
              />
              <input
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Bio"
                className="px-4 py-2 rounded-md bg-gray-900 text-white border border-green-400 focus:outline-none"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="px-4 py-2 rounded-md bg-gray-900 text-white border border-green-400 focus:outline-none"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 bg-green-400 text-black rounded-md font-semibold hover:bg-green-500 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-2 items-center">
            <span className="text-gray-400">Followers: {followers.length}</span>
            <span className="text-gray-400">Following: {following.length}</span>
          </div>
        </div>
      </div>

      {/* User Blogs */}
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Blogs by {profile.username}
        </h2>
        {userBlogs.length === 0 ? (
          <p className="text-gray-400">No blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-900 border border-green-400 rounded-xl overflow-hidden shadow-lg shadow-green-400/30 transform transition duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                {blog.pictures && blog.pictures[0] && (
                  <img
                    src={blog.pictures[0]}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    {blog.description.length > 100
                      ? blog.description.slice(0, 100) + "..."
                      : blog.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(blog._id);
                      }}
                      className="flex items-center gap-2 text-green-400 hover:text-green-500 transition"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{blog.totalLikes || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
