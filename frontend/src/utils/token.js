export function saveAccessToken(accessToken){

const payload=JSON.parse(atob(accessToken.split(".")[1]));
localStorage.setItem("accessToken",accessToken)
localStorage.setItem("accessTokenExp", payload.exp * 1000);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
  
}