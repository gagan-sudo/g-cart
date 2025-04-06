import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader/>;
  return user ? children : <Navigate to="/auth/signin" replace />;
};

export default PrivateRoute;