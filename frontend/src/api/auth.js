// 📁 front/src/api/auth.js

const API_BASE = "http://localhost:3000";

// ✅ Signup user
export async function signupUser({ username, password, email }) {
  const res = await fetch(`${API_BASE}/api/auth/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });

  const data = await res.json()

  if(!res.ok){
    throw new Error(data|| "Signup Failed")
  }
  return data
}

// ✅ Login user
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
 const data = await res.json()

  if(!res.ok){
    throw new Error(data.message|| "Signup Failed")
  }
  return data
}

// ✅ Get user profile (requires access token)
export async function fetchProfile(accessToken) {
  const res = await fetch(`${API_BASE}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

   const data = await res.json()
  if(!res.ok){
    throw new Error(data.message|| "Signup Failed")
  }
  return data
}

// ✅ Update username
export async function updateUsername(accessToken, newUsername) {
  const res = await fetch(`${API_BASE}/api/user/profile/username`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({newUsername}),
  });
   const data = await res.json()
  if(!res.ok){
    throw new Error(data.message|| "user name not changed")
  }
  return data.user
}

// ✅ Update password
export async function updatePassword(accessToken, currentPassword, newPassword) {
  const res = await fetch(`${API_BASE}/api/user/profile/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return res.json();
}

// ✅ Update profile picture (by URL)
export async function updateProfilePic(accessToken, profilePic) {
  const res = await fetch(`${API_BASE}/api/user/profile/picture`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ profilePic }),
  });
  return res.json();
}
