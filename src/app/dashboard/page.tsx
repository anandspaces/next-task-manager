"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 mt-4">No tasks available.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task: any) => (
            <div key={task.id} className="p-4 bg-white shadow-md border rounded">
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              <p className="text-gray-600">{task.description || "No description"}</p>
              <p className="text-sm text-gray-500 mt-2">Due: {task.dueDate || "No due date"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
