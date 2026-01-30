import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatProvider from "./store/socketContext.jsx";
import { useEffect, lazy, Suspense } from "react";
import { scheduleTokenRefresh, clearRefreshTimer } from "./utils/authScheduler.js";
import { connectSocket } from "./sockets/socket.js";

// Lazy load pages
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Navbar = lazy(() => import("./pages/Nav.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const UserChats = lazy(() => import("./Chat/pages/UserChat.jsx"));
const ProfileStatistics = lazy(() => import("./pages/setUserInfo.jsx"));
const Call = lazy(() => import("./Call/Calls_entry_point.jsx"));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-black text-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

function App() {

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      clearRefreshTimer();
      scheduleTokenRefresh();
      connectSocket();
    }
  }, []);

  return (
    <ChatProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/connect" element={<Navbar />} />
            <Route path="/connect/home" element={<Home />} >
              <Route path="chats" element={<UserChats />}></Route>
              <Route path="calls" element={<Call />}></Route>
            </Route>

            <Route path="/connect/signup" element={<Signup />} />

            <Route path="/connect/signup/setProfileInformation" element={<ProfileStatistics />} />

            <Route path="/connect/profile" element={<Profile />} />

            <Route path="/connect/login" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
