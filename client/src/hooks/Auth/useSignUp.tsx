"use client";

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState<string | null>(null);

  const { dispatchAuth } = useAuthContext();
  const router = useRouter();

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Signup failed");
        return;
      }

      dispatchAuth({
        type: "LOGIN",
        payload: json.user,
      });

      setSucces(json.message);

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
    succes,
  };
};
