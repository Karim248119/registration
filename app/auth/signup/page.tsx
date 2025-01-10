"use client";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signUp } from "@/app/services/auth";
import { SignupFormData } from "@/app/types/auth";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/app/utils/validation";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";

const inputStyle = {
  width: "100%",
  padding: "18px 50px",
  borderRadius: "4px",
  borderColor: "#d1d5db",
};

const Signup = () => {
  const { login } = useAuth();
  const [clientType, setClientType] = useState("MY_COMPANY");
  const [mobile_country_code, setMobile_country_code] = useState<string>("");
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handlePhoneInputChange = (
    field: ControllerRenderProps<SignupFormData, "mobile">,
    value: string,
    country: CountryData
  ) => {
    field.onChange(value);
    setMobile_country_code(country.dialCode);
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsloading(true);
      const signupData = {
        ...data,
        mobile_country_code,
      };
      await signUp(signupData);
      await login();
      toast.success("Successfully signed up!");
      router.push("/test_auth");
    } catch (error: any) {
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsloading(false);
    }
  };

  const handleClientTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClientType = e.target.value;
    setClientType(newClientType);

    if (newClientType !== "B2B") {
      resetField("issuing_authority");
      resetField("company_name");
      resetField("commercial_license_number");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:max-w-[50vw] p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-4 space-y-6 md:space-y-0 md:grid grid-cols-2">
            <div className="space-y-6">
              <Input
                id="name"
                label="Name"
                type="text"
                register={register}
                error={errors.name}
                required
              />
              <Input
                id="email"
                label="Email"
                type="email"
                register={register}
                error={errors.email}
                required
              />
              <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password}
                required
              />
              <Input
                id="password_confirmation"
                label="Confirm Password"
                type="password"
                register={register}
                error={errors.password_confirmation}
                required
              />
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2 mt-2"
                >
                  Mobile Number
                  <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      inputStyle={inputStyle}
                      {...field}
                      country={"eg"}
                      inputProps={{
                        name: "mobile",
                        required: true,
                        autoFocus: false,
                      }}
                      onChange={(value, country: CountryData) => {
                        handlePhoneInputChange(field, value, country);
                      }}
                    />
                  )}
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="client_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Client Type <span className="text-red-600">*</span>
                </label>
                <select
                  id="client_type"
                  {...register("client_type")}
                  value={clientType}
                  onChange={handleClientTypeChange}
                  className="w-full px-4 pt-3 pb-2 mt-2 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MY_COMPANY">My Company</option>
                  <option value="B2C">B2C</option>
                  <option value="B2B">B2B</option>
                </select>
                {errors.client_type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.client_type.message}
                  </p>
                )}
              </div>

              {clientType === "B2B" && (
                <>
                  <Input
                    id="issuing_authority"
                    label="Issuing Authority"
                    type="text"
                    register={register}
                    error={errors.issuing_authority}
                    required
                  />
                  <Input
                    id="company_name"
                    label="Company Name"
                    type="text"
                    register={register}
                    error={errors.company_name}
                    required
                  />
                  <Input
                    id="commercial_license_number"
                    label="Commercial License Number"
                    type="text"
                    register={register}
                    error={errors.commercial_license_number}
                    required
                  />
                </>
              )}
            </div>
          </div>
          <Button
            title="Sign up"
            disabled={isloading}
            className={`${isloading && "bg-slate-400"}`}
          />
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?
          <Link
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-700 font-bold mx-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
