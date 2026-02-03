import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);
  const { dispatch } = useAuthContext();

  const signin = async (email: string, password: string, remember: boolean) => {
    setIsLoading(true);
    setError(null);

    const jwt_expired = remember ? "30d" : "3d";

    const response = await fetch("/api/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        jwt_expired,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log(json);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json.user));
      localStorage.setItem("token", JSON.stringify(json.token));

      dispatch({ type: "LOGIN", payload: json.user });

      setIsLoading(false);

      setSucces(json.message);
    }
  };
  return { signin, error, succes, isLoading };
};
