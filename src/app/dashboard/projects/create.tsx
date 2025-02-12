"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.push("/dashboard/projects");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create Project</h1>
      <form onSubmit={handleCreateProject} className="mt-4 space-y-4">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Project Name"
          className="w-full p-2 border rounded"
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Project Description"
          className="w-full p-2 border rounded"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Create Project</button>
      </form>
    </div>
  );
}
