import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-900 hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
