"use client";
import { useState } from "react";
import { Menu } from "lucide-react"; // Icon for the sidebar toggle

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Hidden on mobile, can be toggled) */}
      <aside
        className={`fixed md:relative z-10 w-64 bg-gray-900 text-white p-4 transform transition-transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <button
          className="block md:hidden text-white mb-4"
          onClick={() => setIsSidebarOpen(false)}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold">Task Manager</h2>
        <nav className="mt-6 space-y-2">
          <a href="/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</a>
          <a href="/dashboard/tasks" className="block p-2 rounded hover:bg-gray-700">Tasks</a>
          <a href="/dashboard/projects" className="block p-2 rounded hover:bg-gray-700">Projects</a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        <button
          className="md:hidden mb-4 p-2 bg-gray-800 text-white rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
