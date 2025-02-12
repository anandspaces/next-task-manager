"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch {
        setError("Failed to load tasks. Try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
      <Link href="/dashboard/tasks/create">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          + Create Task
        </button>
      </Link>

      {loading ? (
        <p className="mt-4 text-gray-500">Loading tasks...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="mt-4 text-gray-500">No tasks found. Create one above!</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task: any) => (
            <div key={task.id} className="p-4 bg-white shadow-md border rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="mt-2 flex justify-end">
                <Link 
                  href={`/dashboard/tasks/edit/${task.id}`} 
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
