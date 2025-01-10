"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { signIn } from "@/app/services/auth";
import { SigninFormData } from "@/app/types/auth";
import { useRouter } from "next/navigation";
import { signinScheme } from "@/app/utils/validation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";

export default function page() {
  const { login } = useAuth();
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinScheme),
  });
  const onSubmit = async (data: SigninFormData) => {
    try {
      setIsloading(true);
      await signIn(data);
      toast.success("Login successful! Redirecting...");
      await login();
      router.push("/test_auth");
    } catch (error) {
      toast.error("Invalid data. Please try again.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign in
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              register={register}
              error={errors.email}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              error={errors.password}
            />

            <Button
              title="Sign in"
              disabled={isloading}
              className={`${isloading && "bg-slate-400"}`}
            />

            <div className="text-center">
              have an account?
              <Link
                href="/auth/signup"
                className="text-blue-700 font-bold mx-2"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
