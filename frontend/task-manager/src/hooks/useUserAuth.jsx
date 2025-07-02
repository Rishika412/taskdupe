import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      clearUser();

      // Only navigate if you're NOT already on /login
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [user, loading, clearUser, navigate, location.pathname]);
};
