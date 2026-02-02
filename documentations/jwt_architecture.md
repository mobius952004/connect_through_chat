# JWT Architecture & Authentication Flow

## 1. Overview
This application uses a **Dual-Token Architecture** (Access Token + Refresh Token) to secure communications between the React Frontend and the Express Backend.

-   **Access Token**: Short-lived (15m), used for API authorization.
-   **Refresh Token**: Long-lived (30d), used to obtain new access tokens silently.

## 2. Tools & Libraries

### Backend (Node.js/Express)
1.  **`jsonwebtoken`**:
    -   **Purpose**: Used to **sign** (create) and **verify** tokens.
    -   **Location**: `shared/utils/jwt.utils.js`
    -   **Key Functions**: `jwt.sign()` (creates token), `jwt.verify()` (checks validity).
2.  **`cookie-parser`**:
    -   **Purpose**: Parses cookies from incoming requests so the server can read the `httpOnly` refresh token.
3.  **`bcrypt`**:
    -   **Purpose**: Hashes passwords before storing them in the database.

### Frontend (React)
1.  **`jwt-decode`**:
    -   **Purpose**: Decodes the Base64 payload of the Access Token *without verification*.
    -   **Usage**: Used in `socketContext.jsx` to extract the `username` and `userId` to display on the UI immediately.
    -   **Note**: This does NOT verify if the signature is valid; it only reads the data inside.
2.  **`fetch` Interceptors** (Custom logic in `api/fetchWithAuth.js`):
    -   **Purpose**: Automatically attaches the `Authorization: Bearer <token>` header to requests and handles 401 errors by calling the refresh endpoint.

## 3. Token Anatomy

### Access Token
-   **Storage**: Frontend `localStorage`.
-   **Purpose**: Proof of identity for accessing protected resources (chats, profile). Contains User ID and Username.

### Refresh Token
-   **Storage**: Secure **HTTP-Only Cookie** (Not accessible to JavaScript).
-   **Purpose**: Securely requesting a new Access Token. It is bound to a specific device ID.

## 4. The Authentication "Loop"

### A. The Setup (Cookie Path)
You will notice the refresh cookie is set with `path: "/api/auth/user/refresh"`.
-   **What this means:** The browser **ONLY** sends this cookie when you make a request to that specific URL.
-   **Why:** If you visit `/connect/home`, the cookie is NOT sent. This is excellent for security (less exposure) and performance. It is only sent exactly when it is needed—to refresh the token.

### B. The Automatic Refresh Logic
Does the app "detect" the refresh token when you visit without logging in?
**Yes and No.**

1.  **Frontend Starts**: You open the app. LocalStorage might have an expired access token (or correctly valid one).
2.  **Blind Trust**: The app renders the dashboard because `jwt-decode` (in `socketContext`) sees a token structure. Any check there is just for UI.
3.  **The Real Test**: The app tries to fetch chats (`GET /api/messages/...`).
4.  **Rejection**: The backend sees the access token is missing/expired. It typically returns `401 Unauthorized`.
5.  **The Interceptor (The Hero)**:
    -   `fetchWithAuth.js` catches that `401`.
    -   It thinks "Ah, my access token died. Let me try to refresh."
    -   It calls `refreshAccessToken()`.
6.  **The Magic**:
    -   The browser sends a `POST` request to `/api/auth/user/refresh`.
    -   **BECAUSE** the URL matches the Cookie Path, the browser **automatically attaches the Refresh Cookie**.
    -   The server verifies it and sends back a fresh Access Token.
7.  **Seamless Resume**: `fetchWithAuth` saves the new token and retries the chat request. You never see a loading screen or login page.

### Code Snippets

**1. Setting the Cookie (Backend - `auth.controller.js`)**
This is how we give the user the refresh capability securely.
```javascript
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,                // JS cannot read this (Security)
  secure: false,                 // Set true for HTTPS
  sameSite: "lax",               // CSRF protection
  path: "/api/auth/user/refresh", // <--- Only sent to this path
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
});
```

**2. Moving/Rotating the Token (Backend - `auth.service.js`)**
Every time we use a refresh token, we destroy the old one and make a new one (Rotation).
```javascript
async refreshTokens(refreshToken) {
    // 1. Verify old token
    const payload = jwtservices.verifyRefresh(refreshToken); 
    
    // 2. Check DB for device binding
    const device = await Device.findOne({ deviceId: payload.deviceId });
    
    // 3. Security: Check if token hash matches DB (Detect reuse)
    if (device.refreshHash !== sha256(refreshToken)) throw new Error("Token mismatch");

    // 4. Create NEW pair
    const newAccess = jwtservices.signAccessToken(user);
    const newRefresh = jwtservices.signRefreshToken(user, device.deviceId);

    // 5. Save NEW hash to DB
    device.refreshHash = jwtservices.sha256(newRefresh);
    await device.save();

    return { accessToken: newAccess, refreshToken: newRefresh };
}
```

**3. The Interceptor (Frontend - `fetchWithAuth.js`)**
This is exactly how the frontend handles the 401 and uses the cookie.
```javascript
export async function fetchWithAuth(url, options = {}) {
  // 1. Try request with current access token
  let res = await fetch(url, { ...options, headers: { Authorization: `Bearer ${token}` } });

  // 2. If it fails with 401 (Unauthorized)
  if (res.status === 401) {
    // 3. Ask for a refresh (Browser sends cookie automatically)
    const refreshRes = await fetch('/api/auth/user/refresh', { method: "POST" });
    
    if (refreshRes.ok) {
       // 4. Get new access token
       const { accessToken } = await refreshRes.json();
       localStorage.setItem("accessToken", accessToken);
       
       // 5. Retry original request with new token
       return fetch(url, { ...options, headers: { Authorization: `Bearer ${accessToken}` } });
    }
  }
  return res;
}
```
