import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "../Api";

export default function UserProfile() {
  const { username } = useParams();
  // console.log(`this is the user${username}`)
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    posts: 0,
    followers: 0,
    following: 0,
    joinedDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const response = await fetchUser({ username });
        const user = response.user || response; // Handle different response structures

        setUserInfo({
          username: user.username || "",
          email: user.email || "",
          posts: user.posts || 0,
          followers: user.followers || 0,
          following: user.following || 0,
          joinedDate: user.joinedDate || "Unknown",
        });

        setEditData({
          username: user.username || "",
          email: user.email || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadUser();
    }
  }, [username]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes
      setUserInfo({
        ...userInfo,
        username: editData.username,
        email: editData.email,
      });
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    navigate("/social/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="text-center">
          <div className="text-red-400 mb-4">Error: {error}</div>
          <button
            onClick={() => navigate("/social/login")}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 border border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-sm">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10 rounded-2xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header with avatar */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
                {userInfo.username || "User Profile"}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={isEditing ? editData.username : userInfo.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-4 bg-gray-800/50 text-white border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm pl-12 disabled:opacity-70"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={isEditing ? editData.email : userInfo.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-4 bg-gray-800/50 text-white border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm pl-12 disabled:opacity-70"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-600/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {userInfo.posts}
                  </div>
                  <div className="text-sm text-gray-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {userInfo.followers}
                  </div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {userInfo.following}
                  </div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
              </div>

              {/* Joined Date */}
              <div className="text-center text-gray-400 text-sm">
                Member since {userInfo.joinedDate}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEdit}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transform hover:scale-[1.02]"
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-4 rounded-xl transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}