"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ title: "", description: "" });
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.push("/dashboard/tasks");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <form onSubmit={handleEditTask} className="mt-4 space-y-4">
        <input 
          type="text" 
          value={task.title} 
          onChange={(e) => setTask({ ...task, title: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <textarea 
          value={task.description} 
          onChange={(e) => setTask({ ...task, description: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}
