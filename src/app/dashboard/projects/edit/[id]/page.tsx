"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState({ name: "", description: "" });
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [id]);

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.push("/dashboard/projects");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <form onSubmit={handleEditProject} className="mt-4 space-y-4">
        <input 
          type="text" 
          value={project.name} 
          onChange={(e) => setProject({ ...project, name: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <textarea 
          value={project.description} 
          onChange={(e) => setProject({ ...project, description: e.target.value })} 
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}
