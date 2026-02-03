import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const { dispatch } = useAuthContext();

  const signout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return { signout };
};
