import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      <input
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default Input;
