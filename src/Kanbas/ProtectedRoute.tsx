import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "./store"; // Ensure this path is correct

export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  if (currentUser) {
    return <>{children}</>; 
  } else {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }
}
