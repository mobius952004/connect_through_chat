import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/token";
const RequireAuth = () => {
  const token = getAccessToken(); // or check context state
  return token ? <Outlet /> : <Navigate to="/connect/login" replace />;
};
export default RequireAuth;