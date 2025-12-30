import { refreshAccessToken } from "../api/auth";

let refreshTimeout;

export function clearRefreshTimer() {
  if (refreshTimeout) clearTimeout(refreshTimeout)
    refreshTimeout=null;
}


export function scheduleTokenRefresh() {
  const exp = Number(localStorage.getItem("accessTokenExp"));
  console.log(exp)
  if (!exp) return;

  const delay = exp - Date.now() - 60_000;

  if (delay <= 0) {
    refreshAccessToken().then(()=>scheduleTokenRefresh()).catch(()=>console.log("refresh failed"));
    return;
  }

  refreshTimeout = setTimeout(async () => {
    try {
      await refreshAccessToken();
      scheduleTokenRefresh();
    } catch {
    //   logout();
    console.log("timeout")
    }
  }, delay);
}
