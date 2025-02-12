"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (!res.ok) throw new Error("Task not found");
        const data = await res.json();
        setTask(data);
      } catch {
        setError("Task not found. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("Failed to update task");

      setSuccess(true);
      setTimeout(() => router.push("/dashboard/tasks"), 1500);
    } catch {
      setError("Error updating task. Please try again.");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading task...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Edit Task</h1>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Task updated successfully!</p>}

      <form onSubmit={handleEditTask} className="mt-4 space-y-4">
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
