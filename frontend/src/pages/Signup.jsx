import { useState, useEffect, useRef } from "react";
import { signupUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../sockets/socket";
import { LockIcon } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await signupUser(formData);
      localStorage.setItem("accessToken", accessToken);

      navigate("/connect/home");
      connectSocket();
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };
  const handleLoginRedirect = async () => {
    navigate("/connect/login");
  };

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation once component mounts
    setFadeIn(true);
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const NUM_NODES = 45;
    const nodes = [];
    for (let i = 0; i < NUM_NODES; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        glow: 0.7 + Math.random() * 0.3,
      });
    }

    // Draw lines
    for (let i = 0; i < NUM_NODES; i++) {
      for (let j = i + 1; j < NUM_NODES; j++) {
        const dist = Math.hypot(
          nodes[i].x - nodes[j].x,
          nodes[i].y - nodes[j].y
        );
        if (dist < 200) {
          ctx.save();
          ctx.globalAlpha = 0.13;
          ctx.strokeStyle = "cyan";
          ctx.shadowColor = "#00ffa0";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Draw glowing nodes
    for (const node of nodes) {
      ctx.save();
      ctx.globalAlpha = node.glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = "#10ffde";
      ctx.shadowColor = "#00ffdc";
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden px-4">
      {/* Animated background elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ width: "100vw", height: "100vh" }}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-400/50 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <div
          className={`relative max-w-md mx-auto bg-slate-900 p-10 border border-slate-700 rounded-2xl shadow-2xl shadow-black transform transition-all duration-700 ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Subtle gradient overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-transparent to-emerald-900 rounded-2xl pointer-events-none z-0"></div> */}

          <div className="relative z-10">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-bl from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
                Create Account
              </h2>
              <p className="text-slate-400 mt-2">Join us today</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 backdrop-blur-sm">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoComplete="new-username"
                    className="w-full bg-slate-800/50 text-white border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm pl-12"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
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
                <label className="block text-sm font-semibold text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="new-email"
                    className="w-full bg-slate-800/50 text-white border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm pl-12"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
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

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    className="w-full bg-slate-800/50 text-white border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm pl-14"
                  />
                  <span>
                    <LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />

                    {/* <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg> */}
                  </span>
                </div>
              </div>

              {/* Sign Up Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-l from-green-600 to-emerald-800 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/30 transform hover:scale-[1.02] mb-4"
                >
                  Create Account
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600/50"></div>
                </div>
                <div className="relative bg-slate-800 px-4 text-sm text-slate-400">
                  or
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLoginRedirect}
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-4 rounded-xl transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50 backdrop-blur-sm"
              >
                Already have an account? Sign In
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-xs text-slate-500">
              By signing up, you agree to our{" "}
              <button className="text-green-400 hover:text-green-300 transition-colors">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-green-400 hover:text-green-300 transition-colors">
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
