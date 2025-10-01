import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/userContext";
import { useBlogs } from "../context/BlogContext";
import { useNotifications } from "../context/NotificationContext";
import { Heart } from "lucide-react";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user: currentUser } = useAuth();
  const { profile, followers, following, userBlogs, fetchUserProfile, fetchFollowers, fetchFollowing, fetchUserBlogs, updateUserProfile } = useUser();
  const { likeBlogPost } = useBlogs();
  const { notifications, fetchNotifications } = useNotifications();

  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [editing, setEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  // Load profile, followers, following, blogs, notifications
  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      try {
        await fetchUserProfile(id);
        await fetchFollowers(id);
        await fetchFollowing(id);
        await fetchUserBlogs(id);
        await fetchNotifications();
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [id]);

  useEffect(() => {
    if (profile) {
      setEditUsername(profile.username);
      setEditBio(profile.bio || "");
      setEditAvatar(profile.avatar || "");
    }
  }, [profile]);

  const handleLike = async (blogId) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    await likeBlogPost(blogId);
  };

  const handleFollow = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try {
      if (following.includes(profile._id)) {
        await unfollow(profile._id);
      } else {
        await follow(profile._id);
      }
    } catch (err) {
      console.error("Follow/unfollow failed:", err);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile({
        username: editUsername,
        bio: editBio,
        avatar: editAvatar,
      });
      setEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  if (loading) return <div className="text-center text-green-400 mt-20">Loading profile...</div>;
  if (!profile) return <div className="text-center text-red-500 mt-20">User not found.</div>;

  const isOwner = currentUser && currentUser._id === profile._id;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt={profile.username}
          className="w-28 h-28 rounded-full object-cover border-2 border-green-400"
        />
        <div>
          {!editing ? (
            <>
              <h1 className="text-3xl font-bold text-green-400">{profile.username}</h1>
              <p className="text-gray-400">{profile.bio || "No bio available."}</p>
              {isOwner && (
                <button
                  onClick={() => setEditing(true)}
                  className="mt-2 px-4 py-2 bg-green-400 text-black rounded-md font-semibold hover:bg-green-500 transition"
                >
                  Edit Profile
                </button>
              )}
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
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                placeholder="Avatar URL"
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

          <div className="flex gap-4 mt-2">
            <span className="text-gray-400">Followers: {followers.length}</span>
            <span className="text-gray-400">Following: {following.length}</span>
          </div>

          {!isOwner && currentUser && (
            <button
              onClick={handleFollow}
              className="mt-2 px-4 py-2 bg-green-400 text-black rounded-md font-semibold hover:bg-green-500 transition"
            >
              {following.includes(profile._id) ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Notifications</h2>
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n.id} className={`p-3 rounded-md ${n.read ? "bg-gray-900" : "bg-green-400 text-black"}`}>
                {n.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User Blogs */}
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Blogs by {profile.username}</h2>
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
                  <img src={blog.pictures[0]} alt={blog.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-green-400 mb-2">{blog.title}</h3>
                  <p className="text-gray-300 mb-2">
                    {blog.description.length > 100 ? blog.description.slice(0, 100) + "..." : blog.description}
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
