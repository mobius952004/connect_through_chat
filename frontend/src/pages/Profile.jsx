import { useEffect, useState } from "react";
import { fetchProfile ,updateUsername} from "../api/auth";
import ChangeUsernameModal from "../components/changeusernamemodal"

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [UsernameModal,setusernameModal]=useState(false)






  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("No accessToken found");
      return;
    }
    
    fetchProfile(accessToken)
      .then((data) => setUser(data))
      .catch((err) => setError(err.message || "Failed to load profile"));
      
  }, []);

   const  handleusernamechange = async (newUsername)=>{

   const accessToken = localStorage.getItem("accessToken");
       if (!accessToken) {
      setError("No accessToken found");
      return;
    }
    
   try{
    const data=await updateUsername(accessToken, newUsername);
    setUser (data)


   }catch(err){
        //  setError(err.message)
        console.log(err.message)
   }

   }

//   const handleusernamechange = async (newUsername) => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) {
//     setError("No accessToken found");
//     return;
//   }

//   try {
//     const data = await updateUsername(accessToken, newUsername);


//     if (data && data.username) {
//       setUser(data);

//     } else {
//       // console.error("Invalid user object returned from backend:", data);
//       setError("Invalid user object");
//     }
//   } catch (err) {
//     console.error("❌ Error during username update:", err.message);
//     setError(err.message || "Something went wrong");
//   }
// };



  if (error) return <div className="text-red-400 text-center mt-6">{error}</div>;


  if (!user) return <div className="text-white text-center mt-6">Loading...</div>;


  return (
  //   <div className="min-h-screen bg-black text-white flex items-center justify-center">
  //     <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
  //       <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

  //       <div className="mb-4">
  //         <p><strong>Username:</strong> {user.username}</p>
  //         <p><strong>Email:</strong> {user.email}</p>
  //         {user.status && <p><strong>Status:</strong> {user.status}</p>}
  //       </div>
  //  {
  //   UsernameModal&& (
  //     <ChangeUsernameModal onClose={()=>setusernameModal(false)} onSave={handleusernamechange} />
  //   )
  //  }
  //       <div className="flex flex-col space-y-3">
  //         <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg" onClick={()=>setusernameModal(true)}>Change Username</button>

  //         <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">Change Password</button>
  //         <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">Update Profile Picture</button>
  //         <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg">Update Status</button>
  //       </div>
  //     </div>
  //   </div>


    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10 rounded-2xl pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header with profile section */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Your Profile
              </h2>
            </div>

            {/* Profile Information */}
            <div className="space-y-4 mb-8">
              <div className="bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Username</p>
                    <p className="text-lg font-semibold text-white">{user.username}</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-lg font-semibold text-white">{user.email}</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {user.status && (
                <div className="bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm border border-gray-700/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <p className="text-lg font-semibold text-white flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {user.status}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                onClick={() => setusernameModal(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Change Username</span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Change Password</span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Update Profile Picture</span>
              </button>
              
              <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Update Status</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Username Modal */}
      {UsernameModal && (
        <ChangeUsernameModal 
          onClose={() => setusernameModal(false)} 
          onSave={handleusernamechange} 
        />
      )}
    </div>
  );
}
