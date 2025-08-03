import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your pages
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile";  
import Login from "./pages/Login";      
import Navbar from "./pages/Nav.jsx";
import Home from "./pages/Home.jsx";
import UserChats from "./components/UserChat.jsx";

function App() {
  return (
    <BrowserRouter> 
      <Routes>       
      
        
        <Route path="/connect" element={<Navbar />} />
        <Route path="/connect/home" element={<Home />} >
        <Route path="chats" element={<UserChats/>}></Route>
        
        </Route>

        <Route path="/connect/signup" element={<Signup />} />

        <Route path="/connect/profile" element={<Profile />} />

      
        <Route path="/connect/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
