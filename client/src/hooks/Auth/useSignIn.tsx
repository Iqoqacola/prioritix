"use client";

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);

  const { dispatchAuth } = useAuthContext();
  const router = useRouter();

  const signin = async (email: string, password: string, remember: boolean) => {
    setIsLoading(true);
    setError(null);
    setSucces(null);

    const jwt_expired = remember ? "30d" : "3d";

    try {
      const response = await fetch("http://localhost:3000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          jwt_expired,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || json.message || "Signin failed");
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
      console.error("Signin failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signin,
    error,
    succes,
    isLoading,
  };
};
