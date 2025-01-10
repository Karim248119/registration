import React, { useState } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  register,
  error,
  required,
  defaultValue = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          defaultValue={defaultValue}
          {...register(id)}
          className={`w-full px-4 py-2 text-gray-900 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-600" : "border-gray-300"
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default Input;
