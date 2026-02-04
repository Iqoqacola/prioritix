import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (fullName, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
        confirm_password: confirmPassword,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json.user));
      localStorage.setItem("token", JSON.stringify(json.token));

      dispatch({ type: "LOGIN", payload: json.user });

      setIsLoading(false);

      setSucces(json.message);
    }
  };

  return { signup, isLoading, error, succes };
};
