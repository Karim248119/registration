"use client";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !isLoading) router.push("/auth/signin");
  }, []);
  if (!user) return null;
  return (
    <div className="flex h-screen justify-center items-center text-3xl font-bold">
      <h1>Hello, {user.name}!</h1>
    </div>
  );
}
