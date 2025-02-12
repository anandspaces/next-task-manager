import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
      <nav className="space-y-4">
        <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
        <Link href="/dashboard/tasks" className="block p-2 hover:bg-gray-700 rounded">Tasks</Link>
        <Link href="/dashboard/projects" className="block p-2 hover:bg-gray-700 rounded">Projects</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
