import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className: string;
}
export default function Button({ title, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 ${className}`}
    >
      {title}
    </button>
  );
}
