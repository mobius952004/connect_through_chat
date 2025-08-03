import { useState } from "react";

export default function ChangeUsernameModal({ onClose, onSave }) {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      setError("Username cannot be empty");
      return;
    }
    try {
      await onSave(newUsername);
      onClose();
    } catch (err) {
      setError(err.message || "Update failed");
    }
  };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    //   <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
    //     <h2 className="text-xl font-semibold mb-4">Change Username</h2>

    //     {error && <div className="text-red-400 text-sm mb-3">{error}</div>}

    //     <form onSubmit={handleSubmit}>
    //       <input
    //         type="text"
    //         placeholder="New username"
    //         value={newUsername}
    //         onChange={(e) => setNewUsername(e.target.value)}
    //         className="w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded focus:outline-none"
    //       />
    //       <div className="flex justify-end space-x-3">
    //         <button
    //           type="button"
    //           onClick={onClose}
    //           className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           type="submit"
    //           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
    //         >
    //           Save
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>


    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Change Username
            </h2>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm placeholder-gray-400 text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-emerald-500/0 pointer-events-none"></div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-all duration-200 font-medium border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-green-500/20 transform hover:scale-[1.02]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
