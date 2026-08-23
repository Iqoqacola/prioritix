"use client";

import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";

export const useSignout = () => {
  const { dispatchAuth } = useAuthContext();
  const router = useRouter();

  const signout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Signout failed");
        return;
      }

      dispatchAuth({
        type: "LOGOUT",
      });

      router.replace("/signin");
      router.refresh();
    } catch (err) {
      console.error("Signout Failed: ", err);
    }
  };

  return {
    signout,
  };
};
