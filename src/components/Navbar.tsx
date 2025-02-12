import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button className="text-gray-600 hover:text-gray-800">Logout</button>
    </nav>
  );
};

export default Navbar;
