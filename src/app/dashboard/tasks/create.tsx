"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.push("/dashboard/tasks");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create Task</h1>
      <form onSubmit={handleCreateTask} className="mt-4 space-y-4">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task Title"
          className="w-full p-2 border rounded"
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task Description"
          className="w-full p-2 border rounded"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Create Task</button>
      </form>
    </div>
  );
}
