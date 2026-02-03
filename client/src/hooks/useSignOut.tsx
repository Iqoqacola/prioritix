import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("signin");
  };

  return { signout };
};
