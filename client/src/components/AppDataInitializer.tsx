"use client";
import { useEffect } from "react";
import { useGetTasks } from "../hooks/Tasks/useGetTasks";

export default function AppDataInitializer() {
  const { getTasks } = useGetTasks();

  useEffect(() => {
    getTasks();
  }, []);
  return null;
}
