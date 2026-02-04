import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const userSTR = localStorage.getItem("user");
      const tokenSTR = localStorage.getItem("token");

      if (userSTR && tokenSTR) {
        const token = JSON.parse(tokenSTR);
        try {
          const response = await fetch("/api/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // const json = await response.json();

          if (!response.ok) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            dispatch({ type: "LOGOUT" });

            navigate("/signin");
          }

          if (response.ok) {
            const user = JSON.parse(userSTR);
            dispatch({ type: "LOGIN", payload: user });
          }
        } catch (err) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });

          navigate("/signin");
        }
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
