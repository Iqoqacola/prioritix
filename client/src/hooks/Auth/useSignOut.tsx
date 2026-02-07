import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const { dispatchAuth } = useAuthContext();
  const navigate = useNavigate();

  const signout = () => {
    dispatchAuth({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("signin");
  };

  return { signout };
};
