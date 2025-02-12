import "../globals.css";

export const metadata = {
  title: "Personal Task Management",
  description: "Manage your tasks and projects efficiently.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white p-6 hidden md:flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
            <nav className="space-y-4">
              <a href="/dashboard" className="block p-2 hover:bg-gray-700 rounded transition">Dashboard</a>
              <a href="/dashboard/tasks" className="block p-2 hover:bg-gray-700 rounded transition">Tasks</a>
              <a href="/dashboard/projects" className="block p-2 hover:bg-gray-700 rounded transition">Projects</a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
