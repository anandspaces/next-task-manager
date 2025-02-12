"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      router.push("/dashboard/tasks");
    } catch (err) {
      setError("Error creating task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Create Task</h1>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <form onSubmit={handleCreateTask} className="mt-4 space-y-4">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task Title"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task Description"
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
